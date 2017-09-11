#==============================================================================
# ■ +++ MOG - XAS COMBO HIT (v1.0) +++
#==============================================================================
# By Moghunter
# http://www.atelier-rgss.com
#==============================================================================
# Apresenta a quantidade de dano e acertos do alvo.
#==============================================================================
module MOG_XAS_COMBO_DISPLAY
  # Tempo para fazer um combo.  
  COMBO_TIME = 1
  # Cancelar a contagem de　Combo caso o inimigo acertar o herói.
  ENEMY_CANCEL_COMBO = true  
  # Posição geral das imagens. X Y
  COMBO_POSITION = [10,80]
  # Posição do número de HITS. X Y
  HIT_POSITION = [45,25]
  # Posição do número de dano. X Y
  TOTAL_POSITION = [100,-20]
  # Prioridade da hud.
  PRIORITY_Z = 150
end 

#==============================================================================
# ■ Game_Temp
#==============================================================================
class Game_Temp
      attr_accessor :combo_hit
      attr_accessor :max_damage   
      attr_accessor :combo_time  
      attr_accessor :xas_combo_x 
      attr_accessor :xas_combo_y 
      attr_accessor :xas_combo_zoom_x 
      attr_accessor :xas_combo_zoom_y 
      attr_accessor :xas_combo_opacity 
      attr_accessor :xas_combo_visible
      attr_accessor :xas_total_x
      attr_accessor :xas_total_y     
      attr_accessor :xas_total_opacity
      attr_accessor :xas_total_visible
      attr_accessor :xas_layout_opacity
      attr_accessor :xas_layout_x
      attr_accessor :xas_layout_y
      attr_accessor :xas_layout_visible
      
#--------------------------------------------------------------------------
# ● Initialize
#--------------------------------------------------------------------------
  alias mog_xascombo_initialize initialize
  def initialize
      mog_xascombo_initialize
      @combo_hit = 0
      @max_damage = 0  
      @combo_time = 0     
      @xas_combo_x = 0   
      @xas_combo_y = 0   
      @xas_combo_zoom_x = 1.00   
      @xas_combo_zoom_y = 1.00   
      @xas_combo_opacity = 0   
      @xas_combo_visible = false
      @xas_total_x = 0  
      @xas_total_y = 0       
      @xas_total_opacity = 0 
      @xas_total_visible = false
      @xas_layout_x = 0      
      @xas_layout_y = 0      
      @xas_layout_opacity = 0 
      @xas_layout_visible = false
    end  
end

#===============================================================================
# ■ XRXS_BattlerAttachment
#==============================================================================
module XRXS_BattlerAttachment 
  
  #--------------------------------------------------------------------------
  # ● Action Effect
  #--------------------------------------------------------------------------  
  alias x_combo_shoot_effect_after_damage shoot_effect_after_damage
  def shoot_effect_after_damage(skill, bullet, user)
      check_combo_hit_skill(user,skill)
      x_combo_shoot_effect_after_damage(skill, bullet, user)
  end
  
  #--------------------------------------------------------------------------
  # ● Check Combo Hit Skill
  #--------------------------------------------------------------------------    
  def check_combo_hit_skill(user,skill)
      return if self.battler.damage <= 0
      return if skill.damage.to_mp?
      if user.battler.is_a?(Game_Actor) and self.battler.is_a?(Game_Enemy) and not
         self.battler.no_damage_pop
         $game_temp.combo_hit += 1
         $game_temp.max_damage += self.battler.damage
      elsif self.battler.is_a?(Game_Actor)
         $game_temp.combo_time = 0 if MOG_XAS_COMBO_DISPLAY::ENEMY_CANCEL_COMBO        
      end           
  end  
  
  #--------------------------------------------------------------------------
  # ● Execute Attack Effect After Damage
  #--------------------------------------------------------------------------      
  alias x_combo_execute_attack_effect_after_damage execute_attack_effect_after_damage
  def execute_attack_effect_after_damage(attacker)
      x_combo_execute_attack_effect_after_damage(attacker)
      check_combo_hit_attack(attacker)
  end  
  
  #--------------------------------------------------------------------------
  # ● Check Combo Hit Attack
  #--------------------------------------------------------------------------    
  def check_combo_hit_attack(attacker)
      return if self.battler.damage <= 0
      return if self.battler.is_a?(Game_Enemy)
      $game_temp.combo_time = 0 if MOG_XAS_COMBO_DISPLAY::ENEMY_CANCEL_COMBO
  end  
   
  
end  

#===============================================================================
# ■ Combo_Sprite_Hud
#===============================================================================
class Combo_Sprite_Hud 
   include MOG_XAS_COMBO_DISPLAY
   
  #--------------------------------------------------------------------------
  # ● Initialize
  #--------------------------------------------------------------------------
  def initialize
     @combo_hit_old = $game_temp.combo_hit 
     @animation_speed = 0
     @pos_x = COMBO_POSITION[0]
     @pos_x_fix = 0
     @pos_y = COMBO_POSITION[1]
     @animation_speed = 0
     @shake_x = 0
     @shake_duration = 0 
     create_combo_sprite
     create_total_damage_sprite     
     create_hud_sprite   
     if @combo_hit_old == 0
        $game_temp.xas_total_visible = false
        $game_temp.xas_combo_visible = false
        $game_temp.xas_layout_visible = false
     end       
     update_real_position(true)
   end       

  #--------------------------------------------------------------------------
  # ● Create Hud Sprite   
  #--------------------------------------------------------------------------
  def create_hud_sprite   
      @hud = Sprite.new
      @hud.bitmap = Cache.system("XAS_Combo_HUD")
      @hud.z = PRIORITY_Z
      @hud.visible = $game_temp.xas_layout_visible
  end     

  #--------------------------------------------------------------------------
  # ● Create Total Damage Sprite
  #--------------------------------------------------------------------------
  def create_total_damage_sprite    
       @total_image = Cache.system("XAS_Combo_damage")
       @total = Sprite.new
       @total.bitmap = Bitmap.new(@combo_image.width,@combo_image.height)
       @total_im_cw = @total_image.width / 10
       @total_im_ch = @total_image.height     
       total_number_text = $game_temp.max_damage.abs.to_s.split(//)
       for r in 0..total_number_text.size - 1
           total_number_abs = total_number_text[r].to_i 
           total_src_rect = Rect.new(@total_im_cw * total_number_abs, 0, @total_im_cw, @total_im_ch)
           @total.bitmap.blt(@total_im_cw  *  r, 20, @total_image, total_src_rect)        
       end      
       @total.z = PRIORITY_Z + 1
       @total_orig_x = COMBO_POSITION[0] + TOTAL_POSITION[0]
       @total_orig_y = COMBO_POSITION[1] + TOTAL_POSITION[1] 
       @total.visible = $game_temp.xas_total_visible
  end     

  #--------------------------------------------------------------------------
  # ● Create Combo Number  
  #--------------------------------------------------------------------------
  def create_combo_sprite
      @combo_image = Cache.system("XAS_Combo_Number")
      @combo = Sprite.new
      @combo.bitmap = Bitmap.new(@combo_image.width,@combo_image.height)
      @combo_im_cw = @combo_image.width / 10
      @combo_im_ch = @combo_image.height  
      combo_number_text = $game_temp.combo_hit.abs.to_s.split(//)
      for r in 0..combo_number_text.size - 1
          combo_number_abs = combo_number_text[r].to_i 
          combo_src_rect = Rect.new(@combo_im_cw * combo_number_abs, 0, @combo_im_cw, @combo_im_ch)
          @combo.bitmap.blt(@combo_im_cw *  r, 0, @combo_image, combo_src_rect)        
      end      
      @combo.z = PRIORITY_Z + 2
      @combo_orig_x = COMBO_POSITION[0] + HIT_POSITION[0]
      @combo_orig_y = COMBO_POSITION[1] + HIT_POSITION[1]
      @pos_x_fix = (@combo_im_cw / 2 * combo_number_text.size)
      @combo.visible = $game_temp.xas_combo_visible
  end  
     
  #--------------------------------------------------------------------------
  # ● Dispose
  #--------------------------------------------------------------------------
  def dispose
      @combo.bitmap.dispose
      @combo.dispose
      @hud.bitmap.dispose
      @hud.dispose
      @total.bitmap.dispose
      @total.dispose
      @total_image.dispose
      @combo_image.dispose
  end
    
  #--------------------------------------------------------------------------
  # ● update_real_position
  #--------------------------------------------------------------------------  
  def update_real_position(start = false)
      unless start
         return if $game_temp.xas_combo_visible == false
      end
      @combo.x = $game_temp.xas_combo_x 
      @combo.y = $game_temp.xas_combo_y 
      @combo.zoom_x = $game_temp.xas_combo_zoom_x 
      @combo.zoom_y = $game_temp.xas_combo_zoom_y 
      @combo.opacity = $game_temp.xas_combo_opacity 
      @combo.visible = $game_temp.xas_combo_visible
      @total.x = $game_temp.xas_total_x
      @total.y = $game_temp.xas_total_y     
      @total.opacity = $game_temp.xas_total_opacity
      @total.visible = $game_temp.xas_total_visible
      @hud.x = $game_temp.xas_layout_x + @shake_x 
      @hud.y = $game_temp.xas_layout_y       
      @hud.opacity = $game_temp.xas_layout_opacity   
      @hud.visible = $game_temp.xas_layout_visible
  end  
  
  #--------------------------------------------------------------------------
  # ● Refresh
  #--------------------------------------------------------------------------
  def refresh
      @combo_hit_old = $game_temp.combo_hit
      @combo.bitmap.clear
      @total.bitmap.clear
      @shake_duration = 30
      combo_number_text = $game_temp.combo_hit.abs.to_s.split(//)
      for r in 0..combo_number_text.size - 1
         combo_number_abs = combo_number_text[r].to_i 
         combo_src_rect = Rect.new(@combo_im_cw * combo_number_abs, 0, @combo_im_cw, @combo_im_ch)
         @combo.bitmap.blt(@combo_im_cw  *  r, 0, @combo_image, combo_src_rect)        
      end            
      total_number_text = $game_temp.max_damage.abs.to_s.split(//)
      for r in 0..total_number_text.size - 1
         total_number_abs = total_number_text[r].to_i 
         total_src_rect = Rect.new(@total_im_cw * total_number_abs, 0, @total_im_cw, @total_im_ch)
         @total.bitmap.blt(@total_im_cw  *  r, 20, @total_image, total_src_rect)        
      end
      #Combo Position
      @pos_x_fix = (@combo_im_cw / 2 * combo_number_text.size)
      $game_temp.xas_combo_x = @combo_orig_x - @pos_x_fix
      $game_temp.xas_combo_y = @combo_orig_y
      $game_temp.xas_combo_zoom_x = 2.5
      $game_temp.xas_combo_zoom_y = 2.5
      $game_temp.xas_combo_opacity  = 70
      $game_temp.xas_combo_visible = true
      #Total Position      
      $game_temp.xas_total_x = @total_orig_x + 20
      $game_temp.xas_total_y = @total_orig_y     
      $game_temp.xas_total_opacity = 100 
      $game_temp.xas_total_visible = true           
      #Hud Position 
      $game_temp.xas_layout_x = COMBO_POSITION[0]
      $game_temp.xas_layout_y = COMBO_POSITION[1]
      $game_temp.xas_layout_opacity = 255
      $game_temp.xas_layout_visible = true
      $game_temp.combo_time = 60 * MOG_XAS_COMBO_DISPLAY::COMBO_TIME
   end    

  #--------------------------------------------------------------------------
  # ● Slide Update
  #--------------------------------------------------------------------------
  def slide_update
    return if @combo.visible == false
    @animation_speed += 1
    return if @animation_speed  < 1
    @animation_speed = 0
    $game_temp.combo_time -= 1 if $game_temp.combo_time > 0 
    if $game_temp.combo_time > 0 and $game_temp.combo_hit > 0   
        #Total Damage
         if $game_temp.xas_total_x > @total_orig_x
            $game_temp.xas_total_x -= 1
            $game_temp.xas_total_opacity += 8
         else   
            $game_temp.xas_total_x = @total_orig_x
            $game_temp.xas_total_opacity = 255
         end  
         #Combo
         if $game_temp.xas_combo_zoom_x > 1.00
            $game_temp.xas_combo_zoom_x -= 0.05 
            $game_temp.xas_combo_zoom_y -= 0.05       
            $game_temp.xas_combo_opacity  += 8
         else
            $game_temp.xas_combo_zoom_x = 1
            $game_temp.xas_combo_zoom_y = 1 
            $game_temp.xas_combo_opacity = 255
            $game_temp.xas_combo_x = @combo_orig_x - @pos_x_fix
            $game_temp.xas_combo_y = @combo_orig_y
        end           
     elsif $game_temp.combo_time == 0 and @combo.visible == true
           $game_temp.xas_combo_x  -= 5 
           $game_temp.xas_combo_opacity -= 10
           $game_temp.xas_total_x -= 3
           $game_temp.xas_total_opacity -= 10
           $game_temp.xas_layout_x += 5
           $game_temp.xas_layout_opacity   -= 10     
           $game_temp.combo_hit = 0
           @combo_hit_old = $game_temp.combo_hit 
           $game_temp.max_damage = 0
           if $game_temp.xas_combo_opacity  <= 0
              $game_temp.xas_combo_visible = false
              $game_temp.xas_total_visible = false 
              $game_temp.xas_layout_visible = false             
              @combo.visible = false
              @total.visible = false
              @hud.visible = false
           end  
     end    
  end
   
  #--------------------------------------------------------------------------
  # ● Cancel
  #--------------------------------------------------------------------------    
  def cancel
      $game_temp.combo_hit = 0
      $game_temp.max_damage = 0
      $game_temp.combo_time = 0      
      @combo_hit_old = $game_temp.combo_hit
  end  

  #--------------------------------------------------------------------------
  # ● Clear
  #--------------------------------------------------------------------------     
  def clear
      $game_temp.combo_time = 0
  end   
  
  #--------------------------------------------------------------------------
  # ● Update Shake
  #--------------------------------------------------------------------------       
  def update_shake 
      return if @shake_duration == 0
      @shake_duration -= 1
      @shake_x = rand(10)
      @shake_x = 0 if @shake_duration == 0
  end
  
  #--------------------------------------------------------------------------
  # ● Update
  #--------------------------------------------------------------------------
  def update
      refresh if $game_temp.combo_hit != @combo_hit_old
      update_real_position
      update_shake
      slide_update 
  end    
end

#==============================================================================
# ■ Spriteset_Map
#==============================================================================
class Spriteset_Map
  
  #--------------------------------------------------------------------------
  # ● initialize  
  #--------------------------------------------------------------------------
  alias xas_combo_initialize initialize 
  def initialize  
      @combo = Combo_Sprite_Hud.new
      xas_combo_initialize
  end
  
  #--------------------------------------------------------------------------
  # ● Dispose
  #--------------------------------------------------------------------------
  alias xas_combo_dispose dispose
  def dispose    
      @combo.dispose
      xas_combo_dispose
  end
  
  #--------------------------------------------------------------------------
  # ● update   
  #--------------------------------------------------------------------------
  alias xas_combo_update update
  def update   
      @combo.update
      xas_combo_update
  end

end   
$mog_rgss3_xas_combo_hit = true