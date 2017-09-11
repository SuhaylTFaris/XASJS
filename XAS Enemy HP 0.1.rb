#==============================================================================
# ■ +++ MOG - XAS ENEMY HP METER VX (v1.0) +++
#==============================================================================
# By Moghunter
# http://www.atelier-rgss.com
#==============================================================================
# Translated by Calvin624                                                      #
# http://www.xasabs.wordpress.com                                              #
#==============================================================================#
###############################-DESCRIPTION-####################################
#==============================================================================#
# This part of the HUD only appears when you hit an enemy.                     #
# It shows how much HP (or Health Points) an enemy has remaining.              #
#==============================================================================#
# You can turn this feature on and off using SWITCH 9 (Default).               #
#==============================================================================#	
# To change the appearance of the meter in preparation for a boss fight        #
# you must first pull up a SCRIPT command window and complete the following:   #
#                                                                              #
# Name of Boss:                                                                #
# $game_temp.enemy_name = "Name"                                               #
#                                                                              #
# Amount of HP:                                                                #
# $game_temp.enemy_maxhp = X                                                   #
# $game_temp.enemy_hp = X                                                      #
#                                                                              #
# Position of the HUD:                                                         #
# $xas_enemy_boss_wind_x = X                                                   #
# $xas_enemy_boss_wind_y = X                                                   #
#==============================================================================#
# Once you've done that simply turn on the Boss Mode Meter                     #
# using SWITCH 11 (Default).                                                   #
#==============================================================================#
#                                                                              #
# Graphics required:                                                           #
#                                                                              #
# E_HP                                                                         #
# E_HP_BOSS                                                                    #
# E_HP_Number                                                                  #
# E_Layout                                                                     #
# E_Layout_BOSS                                                                #
#                                                                              #
# All images must be in the Windowskin folder.                                 #
#                                                                              #
#==============================================================================#
# For more information visit: http://xasabs.wordpress.com/enemy-hp/            #
#==============================================================================#

module MOG_XAS_ENEMY_HP
  
# Switch ID to disable the Enemy HP meter...............................[SWITCH]
  INFO_DISABLE_SWITCH_ID = 9  
# Time info is displayed on-screen for............................[TIME_SECONDS]
  ENEMY_INFO_FADE_TIME = 2 #(s)
# Position of the Enemy HP (X,Y)...............................[HUD_POSITIONING]
  E_HUD_POS = [0,20]
# Position of the Enemy HP (X,Y)...............................[HUD_POSITIONING]
  E_LAYOUT_POS = [0,0]
# Position of the Enemy HP (X,Y)...............................[HUD_POSITIONING]
  E_NUMBER_POS = [35,20]
# Position of the Enemy HP meter(X,Y)..........................[HUD_POSITIONING]
  E_METER_POS = [28,16]
# Position of the Enemy's name (X,Y)...........................[HUD_POSITIONING]
  E_NAME_POS = [60,-10]
# Priority of HUD  
  E_WINDOWS_PRIORITY_Z = 160
#==============================================================================#
#.................................[BOSS MODE]..................................#
#==============================================================================#

# Switch ID to enable the Boss Mode.....................................[SWITCH]
  BOSS_INFO_SWITCH_ID = 11
# Position of the Boss HP layout (X,Y).........................[HUD_POSITIONING]
  E_LAYOUT_BOSS_POS = [0,0]
# Position of the Boss HP number (X,Y).........................[HUD_POSITIONING]
  E_NUMBER_BOSS_POS = [210,22]
# Position of the Boss HP meter (X,Y)..........................[HUD_POSITIONING]
  E_METER_BOSS_POS = [2,18]
# Position of the Boss' name (X,Y).............................[HUD_POSITIONING]
  E_NAME_BOSS_POS = [70,-10]
# Speed animation
  E_METER_FLOW_SPEED = 3
end

#==============================================================================
# ■ Game_Temp
#==============================================================================
class Game_Temp
  attr_accessor :enemy_hp
  attr_accessor :enemy_maxhp
  attr_accessor :enemy_oldhp
  attr_accessor :enemy_name
  attr_accessor :enemy_hud_x
  attr_accessor :enemy_hud_y
  attr_accessor :enemy_hud_opa
  attr_accessor :enemy_hud_shake
  attr_accessor :enemy_info_ref
  attr_accessor :enemy_refresh_old
  attr_accessor :enemy_number_refresh
  attr_accessor :enemy_hud_need_refresh
  
#--------------------------------------------------------------------------
# ● Initialize
#--------------------------------------------------------------------------
 alias enemy_hud_initialize initialize
 def initialize
     enemy_hud_initialize  
     @enemy_hp = 0
     @enemy_maxhp = 1
     @enemy_oldhp = 0
     @enemy_name = ""
     @enemy_hud_x = 0
     @enemy_hud_y = 0
     @enemy_hud_opa = 0
     @enemy_hud_shake = 0
     @enemy_refresh_old = false
     @enemy_number_refresh = false
     @enemy_info_ref = 0 
     @enemy_hud_need_refresh = false
     $xas_enemy_boss_wind_x = 130
     $xas_enemy_boss_wind_y = 30     
 end

#--------------------------------------------------------------------------
# ● Enemy Hud Opa
#--------------------------------------------------------------------------
 def enemy_hud_opa
   return [[@enemy_hud_opa, 0].max,255].min   
 end 
 
#--------------------------------------------------------------------------
# ● Enemy Info Ref
#--------------------------------------------------------------------------
 def enemy_info_ref
    n = 40 * MOG_XAS_ENEMY_HP::ENEMY_INFO_FADE_TIME
    return [[@enemy_info_ref, 0].max,n].min   
 end   
  
#--------------------------------------------------------------------------
# ● Enemy Hud Shake 
#--------------------------------------------------------------------------
 def enemy_hud_shake 
    return [[@enemy_hud_shake, 0].max,30].min   
 end  
end 

#===============================================================================
# ■ XRXS_BattlerAttachment
#==============================================================================
module XRXS_BattlerAttachment 
  
  #--------------------------------------------------------------------------
  # ● Action Effect Before
  #--------------------------------------------------------------------------  
  alias x_ehp_shoot_effect_before_damage shoot_effect_before_damage
  def shoot_effect_before_damage(skill, bullet, user)
      check_enemy_hp_before(skill)
      x_ehp_shoot_effect_before_damage(skill, bullet, user)
  end
  
  #--------------------------------------------------------------------------
  # ● Action Effect After
  #--------------------------------------------------------------------------  
  alias x_ehp_shoot_effect_after_damage shoot_effect_after_damage
  def shoot_effect_after_damage(skill, bullet, user)
      check_enemy_hp_after(skill)
      x_ehp_shoot_effect_after_damage(skill, bullet, user)
  end  
  
  #--------------------------------------------------------------------------
  # ● Check Enemy HP before
  #--------------------------------------------------------------------------    
  def check_enemy_hp_before(skill)
      return if self.battler.is_a?(Game_Actor)
      return if self.battler.no_damage_pop
      return if skill.damage.to_mp?
      $game_temp.enemy_oldhp = self.battler.hp
      $game_temp.enemy_refresh_old = true              
      $game_temp.enemy_hp = self.battler.hp
      $game_temp.enemy_maxhp = self.battler.mhp
      $game_temp.enemy_name = $data_enemies[self.battler.enemy_id].name   
  end  
  
  #--------------------------------------------------------------------------
  # ● Check Enemy HP After
  #--------------------------------------------------------------------------    
  def check_enemy_hp_after(skill)
      return if self.battler.is_a?(Game_Actor)
      return if self.battler.no_damage_pop
      return if skill.damage.to_mp?
      $game_temp.enemy_hp = self.battler.hp
      $game_temp.enemy_maxhp = self.battler.mhp
      $game_temp.enemy_name = $data_enemies[self.battler.enemy_id].name 
      $game_temp.enemy_hud_shake = 30 if self.battler.damage > 0
      $game_temp.enemy_hud_need_refresh = true      
  end      
  
end  


#==============================================================================
# ■ Game_Character
#==============================================================================
class Game_Character < Game_CharacterBase
  
 #--------------------------------------------------------------------------
 # ● Execute States Slip Damage
 #--------------------------------------------------------------------------        
 alias x_ehp_execute_state_slip_damage execute_state_slip_damage
 def execute_state_slip_damage(damage)
     x_ehp_execute_state_slip_damage(damage)
     check_enemy_hp_slip_damage
 end
 
 #--------------------------------------------------------------------------
 # ● Check Enemy HP Slip Damage
 #--------------------------------------------------------------------------         
 def check_enemy_hp_slip_damage
     return unless $game_switches[MOG_XAS_ENEMY_HP::BOSS_INFO_SWITCH_ID]
     return if self.battler.is_a?(Game_Actor)
     return if self.battler.no_damage_pop   
     $game_temp.enemy_hp = self.battler.hp
     $game_temp.enemy_maxhp = self.battler.mhp
     $game_temp.enemy_name = $data_enemies[self.battler.enemy_id].name 
     $game_temp.enemy_hud_shake = 30 if self.battler.damage > 0
     $game_temp.enemy_hud_need_refresh = true            
 end  
 
end

#==============================================================================
# ■ Enemy_HP_Sprite
#==============================================================================
class Enemy_HP_Sprite   
  include MOG_XAS_ENEMY_HP
  
#--------------------------------------------------------------------------
# ● Initialize
#--------------------------------------------------------------------------
 def initialize
      @name = $game_temp.enemy_name
      @hp = $game_temp.enemy_hp
      @maxhp = $game_temp.enemy_maxhp
      @hp_ref = @hp
      @boss_mode = $game_switches[BOSS_INFO_SWITCH_ID]
      @visible_mode = $game_switches[INFO_DISABLE_SWITCH_ID]
      create_layout
      create_hp_number
      create_hp_meter        
      create_name 
      hp_flow_update
      e_hud_pos
      e_hud_visible 
 end
  
#--------------------------------------------------------------------------
# ● Create Layout
#--------------------------------------------------------------------------
 def create_layout
    if @boss_mode == true
        @layout_image = Cache.system("XAS_E_Layout_BOSS")
        @layout_bitmap = Bitmap.new(@layout_image.width,@layout_image.height)
        @layout_sprite = Sprite.new
        @layout_sprite.bitmap = @layout_bitmap
        @layout_src_rect_back = Rect.new(0, 0,@layout_image.width, @layout_image.height)
        @layout_bitmap.blt(0,0, @layout_image, @layout_src_rect_back)      
        @layout_sprite.z = 7 + MOG_XAS_ENEMY_HP::E_WINDOWS_PRIORITY_Z
        @layout_sprite.x = E_HUD_POS[0] + $xas_enemy_boss_wind_x
        @layout_sprite.y = E_HUD_POS[1] + $xas_enemy_boss_wind_y       
        @layout_sprite.opacity = $game_temp.enemy_hud_opa           
    else
        @layout_image = Cache.system("XAS_E_Layout")
        @layout_bitmap = Bitmap.new(@layout_image.width,@layout_image.height)
        @layout_sprite = Sprite.new
        @layout_sprite.bitmap = @layout_bitmap
        @layout_src_rect_back = Rect.new(0, 0,@layout_image.width, @layout_image.height)
        @layout_bitmap.blt(0,0, @layout_image, @layout_src_rect_back)      
        @layout_sprite.z = 7 + MOG_XAS_ENEMY_HP::E_WINDOWS_PRIORITY_Z
        @layout_sprite.x = E_HUD_POS[0] + E_LAYOUT_POS[0] + $game_temp.enemy_hud_x
        @layout_sprite.y = E_HUD_POS[1] + E_LAYOUT_POS[1] + $game_temp.enemy_hud_y       
        @layout_sprite.opacity = $game_temp.enemy_hud_opa
    end  
 end
  
#--------------------------------------------------------------------------
# ● Create HP Number
#--------------------------------------------------------------------------
 def create_hp_number
     @hp_number_image = Cache.system("XAS_E_HP_Number")
     @hp_number_bitmap = Bitmap.new(@hp_number_image.width,@hp_number_image.height)
     @hp_number_sprite = Sprite.new
     @hp_number_sprite.bitmap = @hp_number_bitmap
     @hp_number_sprite.z = 9 + MOG_XAS_ENEMY_HP::E_WINDOWS_PRIORITY_Z
     @hp_number_sprite.x = E_HUD_POS[0] + E_NUMBER_POS[0] + $game_temp.enemy_hud_x
     @hp_number_sprite.y = E_HUD_POS[1] + E_NUMBER_POS[1] + $game_temp.enemy_hud_y
     @hp_number_sprite.opacity = $game_temp.enemy_hud_opa 
     @im_cw = @hp_number_image.width / 10
     @im_ch = @hp_number_image.height 
     @hp_src_rect = Rect.new(@im_cw,0, @im_cw, @im_ch)
     @hp_number_text = @hp.abs.to_s.split(//)
     for r in 0..@hp_number_text.size - 1         
         @hp_number_abs = @hp_number_text[r].to_i 
         @hp_src_rect = Rect.new(@im_cw * @hp_number_abs, 0, @im_cw, @im_ch)
         @hp_number_bitmap.blt(@im_cw *  r, 0, @hp_number_image, @hp_src_rect)        
     end    
 end
  
#--------------------------------------------------------------------------
# ● Create HP Meter
#-------------------------------------------------------------------------- 
 def create_hp_meter
     @hp_flow = 0
     @hp_damage_flow = 0    
     if @boss_mode 
        @hp_image = Cache.system("XAS_E_HP_BOSS")
        @hp_bitmap = Bitmap.new(@hp_image.width,@hp_image.height)
        @hp_range = @hp_image.width / 3
        @hp_width = @hp_range  * @hp / @maxhp
        @hp_height = @hp_image.height / 2
        @hp_width_old = @hp_width
        @hp_src_rect = Rect.new(@hp_range, 0, @hp_width, @hp_height)
        @hp_bitmap.blt(0,0, @hp_image, @hp_src_rect) 
        @hp_sprite = Sprite.new
        @hp_sprite.bitmap = @hp_bitmap
        @hp_sprite.z = 8 + MOG_XAS_ENEMY_HP::E_WINDOWS_PRIORITY_Z
        @hp_sprite.x = E_METER_BOSS_POS[0] + $xas_enemy_boss_wind_x
        @hp_sprite.x = E_METER_BOSS_POS[1]+ $xas_enemy_boss_wind_y
        @hp_sprite.opacity = $game_temp.enemy_hud_opa       
      else   
        @hp_image = Cache.system("XAS_E_HP")
        @hp_bitmap = Bitmap.new(@hp_image.width,@hp_image.height)
        @hp_range = @hp_image.width / 3
        @hp_width = @hp_range  * @hp / @maxhp
        @hp_height = @hp_image.height / 2
        @hp_width_old = @hp_width
        @hp_src_rect = Rect.new(@hp_range, 0, @hp_width, @hp_height)
        @hp_bitmap.blt(0,0, @hp_image, @hp_src_rect) 
        @hp_sprite = Sprite.new
        @hp_sprite.bitmap = @hp_bitmap
        @hp_sprite.z = 8 + MOG_XAS_ENEMY_HP::E_WINDOWS_PRIORITY_Z
        @hp_sprite.x = E_HUD_POS[0] + E_METER_POS[0] + $game_temp.enemy_hud_x
        @hp_sprite.y = E_HUD_POS[1] + E_METER_POS[1] + $game_temp.enemy_hud_y
        @hp_sprite.opacity = $game_temp.enemy_hud_opa
      end      
 end 
  
#--------------------------------------------------------------------------
# ● Create Name
#--------------------------------------------------------------------------
 def create_name
      @ename = Sprite.new
      @ename.bitmap = Bitmap.new(160,100)
      @ename.x = E_HUD_POS[0] + E_NAME_POS[0] + $game_temp.enemy_hud_x
      @ename.y = E_HUD_POS[1] + E_NAME_POS[1] + $game_temp.enemy_hud_y
      @ename.opacity = $game_temp.enemy_hud_opa
      @ename.z = 9 + MOG_XAS_ENEMY_HP::E_WINDOWS_PRIORITY_Z
      @ename.bitmap.font.size = 14
      @ename.bitmap.font.bold = true
      @ename.bitmap.font.italic = true
      @ename.bitmap.draw_text(0, 0, 100, 32, @name,0)   
 end
  
#--------------------------------------------------------------------------
# ● Dispose
#--------------------------------------------------------------------------
  def dispose
      @hp_number_sprite.bitmap.dispose
      @hp_number_sprite.dispose
      @hp_number_bitmap.dispose
      @hp_sprite.bitmap.dispose
      @hp_sprite.dispose
      @hp_bitmap.dispose
      @ename.bitmap.dispose
      @ename.dispose
      @layout_sprite.bitmap.dispose
      @layout_sprite.dispose
      @layout_bitmap.dispose
      @layout_image.dispose
      @hp_number_image.dispose
      @hp_image.dispose      
  end
    
#--------------------------------------------------------------------------
# ● E Boss Mode Check
#--------------------------------------------------------------------------
  def e_boss_mode_check
      @boss_mode = $game_switches[MOG_XAS_ENEMY_HP::BOSS_INFO_SWITCH_ID] 
      dispose          
      create_layout
      create_hp_number
      create_hp_meter        
      create_name 
      hp_flow_update    
      hp_number_refresh 
      e_hud_pos      
      $game_temp.enemy_hud_opa = 0 
      $game_temp.enemy_info_ref = 0
      $game_temp.enemy_hud_x = 0
      $game_temp.enemy_hud_need_refresh = true
  end
  
#--------------------------------------------------------------------------
# ● Update
#--------------------------------------------------------------------------
  def update
     e_hud_visible #if @visible_mode != $game_switches[INFO_DISABLE_SWITCH_ID]
     name_refresh if @name != $game_temp.enemy_name
     hp_number_refresh if $game_temp.enemy_hud_need_refresh 
     e_boss_mode_check if @boss_mode != $game_switches[MOG_XAS_ENEMY_HP::BOSS_INFO_SWITCH_ID]
     if $game_temp.enemy_hud_opa <= 0
        @layout_sprite.opacity = $game_temp.enemy_hud_opa
        @ename.opacity = $game_temp.enemy_hud_opa 
        @hp_sprite.opacity = $game_temp.enemy_hud_opa
        @hp_number_sprite.opacity = $game_temp.enemy_hud_opa         
        return 
     end   
     hp_flow_update
     e_hud_pos
     e_hud_slide     
  end
   
#--------------------------------------------------------------------------
# ● E Hud Visible
#--------------------------------------------------------------------------
  def e_hud_visible 
      if $game_message.visible or $game_system.hud_visible == false
         visible = false
      else  
         visible = true
      end  
      @ename.visible = visible
      @hp_sprite.visible = visible
      @hp_number_sprite.visible = visible
      @layout_sprite.visible = visible
  end
 
#--------------------------------------------------------------------------
# ● E Hud Slide
#--------------------------------------------------------------------------
  def e_hud_slide
    $game_temp.enemy_info_ref -= 1 
    $game_temp.enemy_hud_shake -= 1 
    if $game_temp.enemy_info_ref == 0 and
       $game_switches[MOG_XAS_ENEMY_HP::BOSS_INFO_SWITCH_ID] == false
       $game_temp.enemy_hud_x += 1
       $game_temp.enemy_hud_opa -= 10
    elsif $game_temp.enemy_info_ref > 0 or 
       $game_switches[MOG_XAS_ENEMY_HP::BOSS_INFO_SWITCH_ID] == true
       $game_temp.enemy_hud_opa += 10 
       $game_temp.enemy_hud_x += 1 if  $game_temp.enemy_hud_x < 0
    end
  end
  
#--------------------------------------------------------------------------
# ● E Hud Pos
#--------------------------------------------------------------------------
  def e_hud_pos 
    if $game_switches[MOG_XAS_ENEMY_HP::BOSS_INFO_SWITCH_ID]    
       if $game_temp.enemy_hud_shake > 0
          @layout_sprite.x = E_LAYOUT_BOSS_POS[0] + $xas_enemy_boss_wind_x
          @layout_sprite.y = E_LAYOUT_BOSS_POS[1] + $xas_enemy_boss_wind_y + rand(4)
          @hp_sprite.x = E_METER_BOSS_POS[0] + $xas_enemy_boss_wind_x
          @hp_sprite.y = E_METER_BOSS_POS[1] + $xas_enemy_boss_wind_y + rand(4)
       else
          @layout_sprite.x = E_LAYOUT_BOSS_POS[0] + $xas_enemy_boss_wind_x
          @layout_sprite.y = E_LAYOUT_BOSS_POS[1] + $xas_enemy_boss_wind_y
          @hp_sprite.x = E_METER_BOSS_POS[0] + $xas_enemy_boss_wind_x
          @hp_sprite.y = E_METER_BOSS_POS[1] + $xas_enemy_boss_wind_y
       end
       @hp_number_sprite.x = E_NUMBER_BOSS_POS[0] + $xas_enemy_boss_wind_x
       @hp_number_sprite.y = E_NUMBER_BOSS_POS[1] + $xas_enemy_boss_wind_y
       @ename.x = E_NAME_BOSS_POS[0] + $xas_enemy_boss_wind_x 
       @ename.y = E_NAME_BOSS_POS[1] + $xas_enemy_boss_wind_y
    else
       @layout_sprite.x = E_HUD_POS[0] + E_LAYOUT_POS[0] + $game_temp.enemy_hud_x
       @layout_sprite.y = E_HUD_POS[1] + E_LAYOUT_POS[1] + $game_temp.enemy_hud_y
       @hp_number_sprite.x = E_HUD_POS[0] + E_NUMBER_POS[0] + $game_temp.enemy_hud_x
       @hp_number_sprite.y = E_HUD_POS[1] + E_NUMBER_POS[1] + $game_temp.enemy_hud_y
       @hp_sprite.x = E_HUD_POS[0] + E_METER_POS[0] + $game_temp.enemy_hud_x
       @hp_sprite.y = E_HUD_POS[1] + E_METER_POS[1] + $game_temp.enemy_hud_y
       @ename.x = E_HUD_POS[0] + E_NAME_POS[0] + $game_temp.enemy_hud_x
       @ename.y = E_HUD_POS[1] + E_NAME_POS[1] + $game_temp.enemy_hud_y
    end
    @layout_sprite.opacity = $game_temp.enemy_hud_opa
    @ename.opacity = $game_temp.enemy_hud_opa 
    @hp_sprite.opacity = $game_temp.enemy_hud_opa
    @hp_number_sprite.opacity = $game_temp.enemy_hud_opa 
  end  
  
#--------------------------------------------------------------------------
# ● Name Refresh
#--------------------------------------------------------------------------
  def name_refresh
      @ename.bitmap.clear
      @name = $game_temp.enemy_name
      @ename.bitmap.draw_text(0, 0, 100, 32, @name) 
  end
  
#--------------------------------------------------------------------------
# ● HP Number Refresh
#--------------------------------------------------------------------------
  def hp_number_refresh       
      if $game_temp.enemy_hud_need_refresh
         $game_temp.enemy_hud_need_refresh = false
         $game_temp.enemy_hud_opa = 255
      end
      if $game_temp.enemy_hud_opa < 100
         $game_temp.enemy_hud_x = -20 
      else
         $game_temp.enemy_hud_x = 0
      end
      $game_temp.enemy_info_ref = 40 * ENEMY_INFO_FADE_TIME
      @hp_number_sprite.bitmap.clear
      if @hp > $game_temp.enemy_hp
         $game_temp.enemy_hud_shake = 30
      end
      @hp = $game_temp.enemy_hp
      @maxhp = $game_temp.enemy_maxhp       
      @hp_number_text = @hp.abs.to_s.split(//)
      for r in 0..@hp_number_text.size - 1         
         @hp_number_abs = @hp_number_text[r].to_i 
         @hp_src_rect = Rect.new(@im_cw * @hp_number_abs, 0, @im_cw, @im_ch)
         @hp_number_bitmap.blt(@im_cw *  r , 0, @hp_number_image, @hp_src_rect)        
       end  
  end   
  
#--------------------------------------------------------------------------
# ● HP Old
#--------------------------------------------------------------------------
  def hp_old 
      @hp_width_old = @hp_range  * $game_temp.enemy_oldhp / $game_temp.enemy_maxhp
      $game_temp.enemy_refresh_old = false
  end
  
#--------------------------------------------------------------------------
# ● HP Flow Update
#--------------------------------------------------------------------------
  def hp_flow_update
      @hp_sprite.bitmap.clear
      @hp_width = @hp_range  * $game_temp.enemy_hp / $game_temp.enemy_maxhp
      hp_old if $game_temp.enemy_refresh_old == true
      #HP Damage---------------------------------
          if @hp_width_old != @hp_width
             valor = (@hp_width_old - @hp_width) * 3 / 100
             valor = 0.2 if valor < 1
          @hp_width_old -= valor if @hp_width_old > @hp_width  
            if @hp_width_old < @hp_width 
               @hp_width_old = @hp_width
            end      
          @hp_src_rect_old = Rect.new(@hp_flow, @hp_height,@hp_width_old, @hp_height)
          @hp_bitmap.blt(0,0, @hp_image, @hp_src_rect_old)       
          end        
      #HP Real------------------------------------
      @hp_src_rect = Rect.new(@hp_flow, 0,@hp_width, @hp_height)
      @hp_bitmap.blt(0,0, @hp_image, @hp_src_rect)          
      @hp_flow += E_METER_FLOW_SPEED 
      if @hp_flow >= @hp_image.width - @hp_range
         @hp_flow = 0  
      end
    end   
    
end  

#==============================================================================
# ■ Spriteset_Map
#==============================================================================
class Spriteset_Map
  
  #--------------------------------------------------------------------------
  # ● initialize  
  #--------------------------------------------------------------------------
  alias xas_enemyhp_initialize initialize 
  def initialize  
      @enemy_hp = Enemy_HP_Sprite.new
      xas_enemyhp_initialize
  end
  
  #--------------------------------------------------------------------------
  # ● Dispose
  #--------------------------------------------------------------------------
  alias xas_enemyhp_dispose dispose
  def dispose    
      @enemy_hp.dispose
      xas_enemyhp_dispose
  end
  
  #--------------------------------------------------------------------------
  # ● update   
  #--------------------------------------------------------------------------
  alias xas_enemyhp_update update
  def update   
      @enemy_hp.update
      xas_enemyhp_update
  end

end   

$mog_rgss3_xas_enemy_hp = true