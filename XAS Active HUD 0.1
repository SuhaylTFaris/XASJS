#==============================================================================
# ■ +++ MOG - XAS ACTIVE HUD VX (v1.0) +++
#==============================================================================
# By Moghunter
# http://www.atelier-rgss.com
#==============================================================================
# - Apresenta o status do herói no mapa.
#==============================================================================
# Na caixa de notas da habilidade coloque a tag abaixo para ativar a função
# de face animada nas habilidades.
#
# <Hud Face>
#
#==============================================================================
module MOG
  #Posição geral da HUD
  HUD = [0,330]
  #Posição do Medidor de HP
  HP_METER = [73,42]
  #Posição do numero de HP
  HP_NUMBER = [95,30]
  #Posição do Medidor de MP
  SP_METER = [33,64] 
  #Posição do numero de MP
  SP_NUMBER = [55,53] 
  #Posição do medidor de EXP 
  EXP_METER = [60,26]
  #Posição do Level.
  EXP_NUMBER = [80,7]
  #Posição do layout.
  LAYOUT = [5,10]
  #Posição da face.
  FACE = [5,10]
  #Posição das condições.
  STATES = [140,50]  
  #Apresenta as condições com efeito de levitação.
  FLOAT_STATES = true
  #Definição da % quando o HP está baixo. Isso influência na
  #cor do HP e SP.
  LOWHP = 30
  #Velodidade da animação do medidor.
  METER_FLOW_SPEED = 5
end

#==============================================================================
# ■ Game_Temp
#==============================================================================
class Game_Temp
  attr_accessor :hud_face_type
  attr_accessor :hud_face_time
  attr_accessor :hud_face_time2
  attr_accessor :hud_face_refresh
  alias active_hud_initialize initialize
  def initialize
      active_hud_initialize
      @hud_face_type = 0
      @hud_face_time = 0
      @hud_face_time2 = 0
      @hud_face_refresh = false
  end    
end

#==============================================================================
# ■ XAS_ACTION
#==============================================================================
module XAS_ACTION
  
  #--------------------------------------------------------------------------
  # ● Execute User Effects
  #--------------------------------------------------------------------------  
  alias xas_hud_execute_user_effects execute_user_effects
  def execute_user_effects(skill)
      xas_hud_execute_user_effects(skill)
      if skill.note =~ /<Hud Face>/
         $game_temp.hud_face_type = 3
         $game_temp.hud_face_time2 = 60
         $game_temp.hud_face_refresh = true
      end
    end    
end     

#==============================================================================
# ■ Game_Actor
#==============================================================================
class Game_Actor < Game_Battler
  #--------------------------------------------------------------------------
  # ● now_exp
  #--------------------------------------------------------------------------      
  def now_exp
      return current_level_exp
  end
  #--------------------------------------------------------------------------
  # ● next_exp
  #--------------------------------------------------------------------------          
  def next_exp
    return next_level_exp#@exp_list[@level+1] > 0 ? @exp_list[@level+1] - @exp_list[@level] : 0
  end
end

#==============================================================================
# ■ Active_Hud
#==============================================================================
class Active_Hud 
  include MOG 
  #--------------------------------------------------------------------------
  # ● Initialize
  #--------------------------------------------------------------------------
  def initialize
      @actor = $game_party.members[0]
      return if @actor == nil
      create_layout    
      create_state
      create_hp   
      create_sp    
      create_level
      create_face
      update_visible    
  end
  
  #--------------------------------------------------------------------------
  # ●  refresh_actor
  #--------------------------------------------------------------------------  
  def refresh_actor
      $game_temp.hud_face_type = 0
      $game_temp.hud_face_time = 0
      $game_temp.hud_face_time2 = 0
      $game_temp.hud_face_refresh = false    
      dispose
      initialize
  end
  
  #--------------------------------------------------------------------------
  # ●  create_layout
  #--------------------------------------------------------------------------   
  def create_layout
      @layout_sprite = Sprite.new
      @layout_sprite.bitmap = Cache.system("Hud_Layout")
      @layout_sprite.z = 150
      @layout_sprite.x = HUD[0] + LAYOUT[0]
      @layout_sprite.y = HUD[1] + LAYOUT[1]   
  end
  
  #--------------------------------------------------------------------------
  # ● create_face
  #--------------------------------------------------------------------------      
  def create_face    
      image_name = "Hud_Face" + @actor.id.to_s
      unless RPG_FileTest.system_exist?(image_name)
        image_name = ""
      end  
      @face_image = Cache.system(image_name)
      @face_sprite = Sprite.new
      @face_sprite.bitmap = Bitmap.new(@face_image.width,@face_image.height)
      @face_cw = @face_image.width / 5
      @face_ch = @face_image.height 
      lowhp = @actor.mhp * @low_hp / 100
      $game_temp.hud_face_type = 4 if @actor.hp < lowhp
      @face_src_rect_back = Rect.new(@face_cw * $game_temp.hud_face_type, 0,@face_cw , @face_ch)
      @face_sprite.bitmap.blt(0,0, @face_image, @face_src_rect_back)      
      @face_sprite.z = 153
      @face_sprite.x = HUD[0] + FACE[0]
      @face_sprite.y = HUD[1] + FACE[1]        
      if @actor.hp < @actor.mhp * @low_hp / 100
         $game_temp.hud_face_type = 4              
      else
         $game_temp.hud_face_type = 0
      end            
      $game_temp.hud_face_time = 10    
  end
  
  #--------------------------------------------------------------------------
  # ● create_state
  #--------------------------------------------------------------------------    
  def create_state
      @states_max = 0
      @states = Sprite.new 
      @states.bitmap = Bitmap.new(72,24)
      @states_x = -1
      @states_y = 0
      @states_f = false
      @states_max = 0
      @states.x = HUD[0] + STATES[0]
      @states.y = @states_y + HUD[1] + STATES[1]
      @states.z = 153
      states_refresh(false)
  end
  
  #--------------------------------------------------------------------------
  # ●  create_hp 
  #--------------------------------------------------------------------------  
  def create_hp 
      @low_hp = LOWHP
      @hp = @actor.hp
      @hp_flow = 0
      @hp_damage_flow = 0  
      @hp_old = @actor.hp
      @hp_ref = @hp_old
      @hp_refresh = false
      #Number SP ----
      @hp_number_image = Cache.system("Hud_HP_Number")
      @hp_number_sprite = Sprite.new
      @hp_number_sprite.bitmap = Bitmap.new(@hp_number_image.width,@hp_number_image.height)
      @hp_number_sprite.z = 153
      @hp_number_sprite.x = HUD[0] + HP_NUMBER[0]
      @hp_number_sprite.y = HUD[1] + HP_NUMBER[1]
      @im_cw = @hp_number_image.width / 10
      @im_ch = @hp_number_image.height / 2    
      #Meter HP -----
      @hp_image = Cache.system("Hud_HP_Meter")
      @hp_range = @hp_image.width / 3
      @hp_height = @hp_image.height / 2
      @hp_width = @hp_range  * @actor.hp / @actor.mhp 
      @hp_width_old = @hp_width    
      @hp_sprite = Sprite.new
      @hp_sprite.bitmap = Bitmap.new(@hp_image.width,@hp_image.height)
      @hp_sprite.z = 152
      @hp_sprite.x = HUD[0] + HP_METER[0]
      @hp_sprite.y = HUD[1] + HP_METER[1]
      hp_flow_update
      hp_number_refresh    
  end
  
  #--------------------------------------------------------------------------
  # ●  create_sp
  #--------------------------------------------------------------------------  
  def create_sp
      @low_sp = LOWHP
      @sp = @actor.mp
      @sp_old = @actor.mp
      @sp_ref = @sp_old 
      @sp_refresh = false 
      @sp_flow = 0
      @sp_damage_flow = 0
      #Number SP -----
      @sp_number_image = Cache.system("Hud_SP_Number")
      @sp_number_sprite = Sprite.new
      @sp_number_sprite.bitmap = Bitmap.new(@sp_number_image.width,@sp_number_image.height)
      @sp_number_sprite.z = 153
      @sp_number_sprite.x = HUD[0] + SP_NUMBER[0]
      @sp_number_sprite.y = HUD[1] + SP_NUMBER[1]
      @sp_im_cw = @sp_number_image.width / 10
      @sp_im_ch = @sp_number_image.height / 2    
      #Meter SP -----
      @sp_image = Cache.system("Hud_SP_Meter")
      @sp_range = @sp_image.width / 3
      @sp_height = @sp_image.height / 2
      @sp_width = @sp_range  * @actor.mp / @actor.mmp        
      @sp_width_old = @sp_width
      @sp_sprite = Sprite.new
      @sp_sprite.bitmap = Bitmap.new(@sp_image.width,@sp_image.height)
      @sp_sprite.z = 152
      @sp_sprite.x = HUD[0] + SP_METER[0]
      @sp_sprite.y = HUD[1] + SP_METER[1]
      sp_flow_update
      sp_number_refresh    
  end  
    
  #--------------------------------------------------------------------------
  # ● create_level
  #--------------------------------------------------------------------------
   def create_level
       @level = @actor.level 
       @exp = @actor.exp
       @level_image = Cache.system("Hud_Exp_Meter")
       @level_sprite = Sprite.new   
       @level_sprite.bitmap = Bitmap.new(@level_image.width,@level_image.height)       
       if @actor.next_exp != 0
          rate = @actor.now_exp.to_f / @actor.next_exp
       else
          rate = 1
       end
       if @actor.level < 99
          @level_cw = @level_image.width * rate 
       else
          @level_cw = @level_image.width
       end       
       @level_src_rect_back = Rect.new(0, 0,@level_cw, @level_image.height)
       @level_sprite.bitmap.blt(0,0, @level_image, @level_src_rect_back)      
       @level_sprite.z = 152
       @level_sprite.x = HUD[0] + EXP_METER[0]
       @level_sprite.y = HUD[1] + EXP_METER[1]   
       # Level Number -----
       @level_number_image = Cache.system("Hud_Exp_Number")
       @level_number_sprite = Sprite.new
       @level_number_sprite.bitmap = Bitmap.new(@level_number_image.width,@level_number_image.height)
       @level_number_sprite.z = 153
       @level_number_sprite.x = HUD[0] + EXP_NUMBER[0]
       @level_number_sprite.y = HUD[1] + EXP_NUMBER[1]
       @level_im_cw = @level_number_image.width / 10
       @level_im_ch = @level_number_image.height     
       @level_number_text = @actor.level.abs.to_s.split(//)
       for r in 0..@level_number_text.size - 1
           @level_number_abs = @level_number_text[r].to_i 
           @level_src_rect = Rect.new(@level_im_cw * @level_number_abs, 0, @level_im_cw, @level_im_ch)
           @level_number_sprite.bitmap.blt(@level_im_cw  *  r, 0, @level_number_image, @level_src_rect)        
       end   
  end  
     
  #--------------------------------------------------------------------------
  # ●  Dispose
  #--------------------------------------------------------------------------
  def dispose
      return if @actor == nil
      #Hp Number Dispose
      @hp_number_sprite.bitmap.dispose
      @hp_number_sprite.dispose
      #HP Meter Dispose
      @hp_sprite.bitmap.dispose
      @hp_sprite.dispose
      #SP Number Dispose
      @sp_number_sprite.bitmap.dispose
      @sp_number_sprite.dispose
      #SP Meter Dispose
      @sp_sprite.bitmap.dispose
      @sp_sprite.dispose
      #States Dispose
      @states.bitmap.dispose
      @states.dispose
      #Level Meter Dispose
      @level_sprite.bitmap.dispose
      @level_sprite.dispose
      #Level Number Dispose
      @level_number_sprite.bitmap.dispose
      @level_number_sprite.dispose
      #Layout Dispose
      @layout_sprite.bitmap.dispose
      @layout_sprite.dispose
      #Face Dispose
      @face_sprite.bitmap.dispose
      @face_sprite.dispose
      #Dispose Images
      @hp_number_image.dispose
      @hp_image.dispose
      @sp_number_image.dispose
      @sp_image.dispose
      @level_image.dispose
      @level_number_image.dispose
      @face_image.dispose    
  end
  #--------------------------------------------------------------------------
  # ● Update Visible
  #--------------------------------------------------------------------------
  def update_visible
      #Visible
      vis = $game_system.enable_hud
      @hp_number_sprite.visible = vis
      @hp_sprite.visible = vis
      @sp_number_sprite.visible = vis
      @sp_sprite.visible = vis
      @states.visible = vis
      @level_sprite.visible = vis
      @level_number_sprite.visible = vis
      @layout_sprite.visible = vis
      @face_sprite.visible = vis   
  end
  
  #--------------------------------------------------------------------------
  # ● Update
  #--------------------------------------------------------------------------
  def update
      return if @actor == nil
      update_visible
      hp_number_update if @hp_old != @actor.hp
      hp_number_refresh if @hp_refresh or @actor.hp == 0 
      sp_number_update if @sp_old != @actor.mp
      sp_number_refresh if @sp_refresh
      face_chance if $game_temp.hud_face_refresh or $game_temp.hud_face_time == 1
      face_normal if $game_temp.hud_face_time2 == 1
      face_effect     
      level_update if @level != @actor.level
      level_up_effect if @level_number_sprite.zoom_x > 1.00  
      exp_update if @exp != @actor.exp
      states_refresh
      states_effect
      hp_flow_update
      sp_flow_update
      $game_temp.hud_face_time -= 1 if $game_temp.hud_face_time > 0
      $game_temp.hud_face_time2 -= 1 if $game_temp.hud_face_time2 > 0     
   end
   
  #--------------------------------------------------------------------------
  # ● Face Normal 
  #--------------------------------------------------------------------------
  def face_normal 
      $game_temp.hud_face_refresh = false
      if @actor.hp < @actor.mhp * @low_hp / 100
         $game_temp.hud_face_type = 4
      else  
         $game_temp.hud_face_type = 0
      end
      $game_temp.hud_face_time2 = 0
      @face_sprite.bitmap.clear
      @face_src_rect_back = Rect.new(@face_cw * $game_temp.hud_face_type, 0,@face_cw , @face_ch)
      @face_sprite.bitmap.blt(0,0, @face_image, @face_src_rect_back)   
      @face_sprite.x = HUD[0] + FACE[0]
  end  
  
  #--------------------------------------------------------------------------
  # ● Face Chance
  #--------------------------------------------------------------------------
   def face_chance     
       $game_temp.hud_face_refresh = false
       @face_sprite.bitmap.clear
       @face_src_rect_back = Rect.new(@face_cw * $game_temp.hud_face_type, 0,@face_cw , @face_ch)
       @face_sprite.bitmap.blt(0,0, @face_image, @face_src_rect_back) 
       @face_sprite.x = HUD[0] + FACE[0]
  end
  
  #--------------------------------------------------------------------------
  # ● Face Effect
  #--------------------------------------------------------------------------
  def face_effect
      if $game_temp.hud_face_type == 2
         @face_sprite.x = HUD[0] + FACE[0] + rand(10)
         if $game_temp.hud_face_time == 2
           if @actor.hp < @actor.mhp * @low_hp / 100 
              $game_temp.hud_face_type = 4
           else             
              $game_temp.hud_face_type = 0 
           end
         end 
      end 
  end   
   
  #--------------------------------------------------------------------------
  # ● States Refresh
  #--------------------------------------------------------------------------
  def states_refresh(zoom = true)
      return if @states_x == @actor.states.size
      @states_x = @actor.states.size
      @states.bitmap.clear
      return if @actor.states.size  == 0
      @states_max = 0
      for i in @actor.states
          unless @states_max > 3
                 icon = Cache.system("Iconset")
                 icon_index = i.icon_index
                 rect = Rect.new(icon_index % 16 * 24, icon_index / 16 * 24, 24, 24)
                 @states.bitmap.blt(24 * @states_max, 0, icon, rect)
                 @states_max += 1 
                 icon.dispose
           end
      end  
      @states.zoom_x = 2 if zoom
      @states.zoom_y = 2 if zoom
  end
   
  #--------------------------------------------------------------------------
  # ● States_Effect
  #--------------------------------------------------------------------------
   def states_effect
       return if @actor.states.size == 0
       if FLOAT_STATES
          if @states_f == false
             @states_y += 1
             @states_f = true if @states_y > 10
          else    
             @states_y -= 1
             @states_f = false if @states_y < -10               
          end  
       end 
       @states.opacity = 155 + rand(100)
       return if @states.zoom_x <= 1.00 
       @states.zoom_x -= 0.02
       @states.zoom_y -= 0.02
       if @states.zoom_x <= 1.00     
          @states.zoom_x = 1.00 
          @states.zoom_y = 1.00 
       end  
  end
  
  #--------------------------------------------------------------------------
  # ● hp_number_update
  #--------------------------------------------------------------------------
  def hp_number_update 
       @hp_refresh = true
       if @hp_old < @actor.hp
           @hp_ref = 5 * (@actor.hp - @hp_old) / 100
           @hp_ref = 1 if @hp_ref < 1
           @hp += @hp_ref     
           if $game_temp.hud_face_type != 1
              $game_temp.hud_face_type = 1
              $game_temp.hud_face_refresh = true
              @face_sprite.x = HUD[0] + FACE[0]
           end           
           if @hp >= @actor.hp
              @hp_old = @actor.hp 
              @hp = @actor.hp   
              @hp_ref = 0
             if @actor.hp < @actor.mhp * @low_hp / 100 and
                $game_temp.hud_face_type != 4
                $game_temp.hud_face_type = 4
                $game_temp.hud_face_time = 30               
             elsif $game_temp.hud_face_type != 0
                $game_temp.hud_face_type = 0
                $game_temp.hud_face_time = 30
             end   
           end  
            
        elsif @hp_old > @actor.hp   
           @hp_refresh = true
           @hp_ref = 5 * (@hp_old - @actor.hp) / 100
           @hp_ref = 1 if @hp_ref < 1 
           @hp -= @hp_ref                
           if $game_temp.hud_face_type != 2
              $game_temp.hud_face_type = 2
              $game_temp.hud_face_refresh = true              
           end
           if @hp <= @actor.hp
              @hp_old = @actor.hp 
              @hp = @actor.hp   
              @hp_ref = 0
            if $game_temp.hud_face_type != 0
                $game_temp.hud_face_time = 30
             end   
           end            
        end  
  end  
      
  #--------------------------------------------------------------------------
  # ● hp_number_refresh
  #--------------------------------------------------------------------------
  def hp_number_refresh 
      @hp_number_sprite.bitmap.clear
      @hp_number_text = @hp.abs.to_s.split(//)
      lowhp2 = @actor.mhp * @low_hp / 100
      if @actor.hp < lowhp2
         @health2 = @im_ch 
      else
         @health2 = 0
      end
      @hp_health = @health2
      for r in 0..@hp_number_text.size - 1         
         @hp_number_abs = @hp_number_text[r].to_i 
         @hp_src_rect = Rect.new(@im_cw * @hp_number_abs, @hp_health, @im_cw, @im_ch)
         @hp_number_sprite.bitmap.blt(@im_cw *  r, 0, @hp_number_image, @hp_src_rect)        
       end  
       @hp_refresh = false if @hp == @actor.hp
  end 
     
  #--------------------------------------------------------------------------
  # ● Hp Flow Update
  #--------------------------------------------------------------------------
  def hp_flow_update
      @hp_sprite.bitmap.clear
      @hp_width = @hp_range  * @actor.hp / @actor.mhp  
          #HP Damage---------------------------------
          if @hp_width_old != @hp_width
          valor = (@hp_width_old - @hp_width) * 3 / 100
          valor = 0.5 if valor < 1                                
          @hp_width_old -= valor if @hp_width_old > @hp_width  
          if @hp_width_old < @hp_width 
             @hp_width_old = @hp_width
          end      
          @hp_src_rect_old = Rect.new(@hp_flow, @hp_height,@hp_width_old, @hp_height)
          @hp_sprite.bitmap.blt(0,0, @hp_image, @hp_src_rect_old)       
          end        
      #HP Real------------------------------------
      @hp_src_rect = Rect.new(@hp_flow, 0,@hp_width, @hp_height)
      @hp_sprite.bitmap.blt(0,0, @hp_image, @hp_src_rect)          
      @hp_flow += METER_FLOW_SPEED  
      if @hp_flow >= @hp_image.width - @hp_range
         @hp_flow = 0  
      end
  end
    
  #--------------------------------------------------------------------------
  # ● Sp_number_update
  #--------------------------------------------------------------------------
  def sp_number_update
    @sp_refresh = true
    if @sp_old < @actor.mp
       @sp_refresh = true
       @sp_ref = 5 * (@actor.mp - @sp_old) / 100
       @sp_ref = 1 if @sp_ref < 1
       @sp += @sp_ref  
           if $game_temp.hud_face_type != 1
              $game_temp.hud_face_type = 1
              $game_temp.hud_face_refresh = true
              @face_sprite.x = HUD[0] + FACE[0]
           end           
       if @sp >= @actor.mp
          @sp_old = @actor.mp 
          @sp = @actor.mp   
          @sp_ref = 0
             if @actor.hp < @actor.mhp * @low_hp / 100 and
                $game_temp.hud_face_type != 4
                $game_temp.hud_face_type = 4
                $game_temp.hud_face_time = 30               
             elsif $game_temp.hud_face_type != 0
                $game_temp.hud_face_type = 0
                $game_temp.hud_face_time = 30
             end           
       end  
    elsif @sp_old >= @actor.mp    
       @sp_ref = 5 * (@sp_old - @actor.mp) / 100
       @sp_ref = 1 if @sp_ref < 1 
       @sp -= @sp_ref     
           if $game_temp.hud_face_type != 3
              $game_temp.hud_face_type = 3
              $game_temp.hud_face_refresh = true
           end       
       if @sp <= @actor.mp
          @sp_old = @actor.mp 
          @sp = @actor.mp   
          @sp_ref = 0
             if @actor.hp < @actor.mhp * @low_hp / 100 and
                $game_temp.hud_face_type != 4
                $game_temp.hud_face_type = 4
                $game_temp.hud_face_time = 35               
             elsif $game_temp.hud_face_type != 0
                $game_temp.hud_face_type = 0
                $game_temp.hud_face_time = 35
             end              
        end          
    end     
  end 
  
  #--------------------------------------------------------------------------
  # ● sp_number_refresh
  #--------------------------------------------------------------------------
  def sp_number_refresh 
      @sp_number_sprite.bitmap.clear
      @s = @actor.mp * 100 / @actor.mmp
      @sp_number_text = @sp.abs.to_s.split(//)
      for r in 0..@sp_number_text.size - 1         
         @sp_number_abs = @sp_number_text[r].to_i 
         if @actor.mp <= @actor.mmp * @low_sp / 100
            @sp_src_rect = Rect.new(@sp_im_cw * @sp_number_abs, @sp_im_ch, @sp_im_cw, @sp_im_ch)  
         else  
            @sp_src_rect = Rect.new(@sp_im_cw * @sp_number_abs, 0, @sp_im_cw, @sp_im_ch)
         end
       @sp_number_sprite.bitmap.blt(@sp_im_cw *  r, 0, @sp_number_image, @sp_src_rect)        
       end  
       @sp_refresh = false if @sp == @actor.mp
   end       
   
  #--------------------------------------------------------------------------
  # ● Sp Flow Update
  #--------------------------------------------------------------------------
  def sp_flow_update
      @sp_sprite.bitmap.clear
      @sp_width = @sp_range  * @actor.mp / @actor.mmp 
          #SP Damage---------------------------------
          if @sp_width_old != @sp_width
          valor = (@sp_width_old - @sp_width) * 3 / 100
          valor = 0.5 if valor < 1             
          @sp_width_old -= valor if @sp_width_old > @sp_width  
          if @sp_width_old < @sp_width 
             @sp_width_old = @sp_width
          end      
          @sp_src_rect_old = Rect.new(@sp_flow, @sp_height,@sp_width_old, @sp_height)
          @sp_sprite.bitmap.blt(0,0, @sp_image, @sp_src_rect_old) 
          end
      #SP Real------------------------------------
      @sp_src_rect = Rect.new(@sp_flow, 0,@sp_width, @sp_height)
      @sp_sprite.bitmap.blt(0,0, @sp_image, @sp_src_rect)
      @sp_flow += METER_FLOW_SPEED  
      if @sp_flow >= @sp_image.width - @sp_range
         @sp_flow = 0  
      end
    end  
    
  #--------------------------------------------------------------------------
  # ● level_update
  #--------------------------------------------------------------------------
  def level_update      
      @level_number_sprite.bitmap.clear
      @level_number_text = @actor.level.abs.to_s.split(//)
      for r in 0..@level_number_text.size - 1
         @level_number_abs = @level_number_text[r].to_i 
         @level_src_rect = Rect.new(@level_im_cw * @level_number_abs, 0, @level_im_cw, @level_im_ch)
         @level_number_sprite.bitmap.blt(@level_im_cw *  r, 0, @level_number_image, @level_src_rect)        
      end       
      @level = @actor.level 
      @level_number_sprite.zoom_x = 2
      @level_number_sprite.zoom_y = 2
      hp_number_refresh 
      sp_number_refresh 
  end
  
  #--------------------------------------------------------------------------
  # ● level_update
  #--------------------------------------------------------------------------
  def level_up_effect
      @level_number_sprite.zoom_x -= 0.02
      @level_number_sprite.zoom_y -= 0.02
      if @level_number_sprite.zoom_x <= 1.00     
         @level_number_sprite.zoom_x = 1.00 
         @level_number_sprite.zoom_y = 1.00 
      end
  end  
  
  #--------------------------------------------------------------------------
  # ● exp_update
  #--------------------------------------------------------------------------
  def exp_update
      @level_sprite.bitmap.clear    
      if @actor.next_exp != 0
         rate = @actor.now_exp.to_f / @actor.next_exp
      else
         rate = 1
      end
      if @actor.level < 99
         @level_cw = @level_image.width * rate 
      else
         @level_cw = @level_image.width
      end       
      @level_src_rect_back = Rect.new(0, 0,@level_cw, @level_image.height)
      @level_sprite.bitmap.blt(0,0, @level_image, @level_src_rect_back)  
      @exp = @actor.exp
  end  
end

#==============================================================================
# ■ Spriteset_Map
#==============================================================================
class Spriteset_Map
  
  #--------------------------------------------------------------------------
  # ● initialize  
  #--------------------------------------------------------------------------
  alias mog_act_hud_initialize initialize 
  def initialize  
      @acthud = Active_Hud.new
      mog_act_hud_initialize
  end
  
  #--------------------------------------------------------------------------
  # ● dispose
  #--------------------------------------------------------------------------
  alias mog_acthud_dispose dispose
  def dispose    
      @acthud.dispose
      mog_acthud_dispose
  end
  
  #--------------------------------------------------------------------------
  # ● update   
  #--------------------------------------------------------------------------
  alias mog_acthud_update update
  def update   
      @acthud.update
      mog_acthud_update
  end
  
  #--------------------------------------------------------------------------
  # ● Refresh Hud
  #--------------------------------------------------------------------------  
  alias mog_acthud_refresh_hud refresh_hud
  def refresh_hud
      mog_acthud_refresh_hud
      @acthud.refresh_actor
  end  
   
end   

$mog_rgss3_xas_active_hud = true