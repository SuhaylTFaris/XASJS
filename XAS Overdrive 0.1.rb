#==============================================================================
# ■ +++ MOG - XAS OVERDRIVE (v1.0) +++
#==============================================================================
# By Moghunter
# http://www.atelier-rgss.com
#==============================================================================
# Ativa o sistema de Overdrive no XAS.
#===============================================================================
module MOG_XAS_OVERDRIVE
  # Posição geral da Hud.
  HUD_POSITION = [10,280]
  # Posição do medidor.
  METER_POS = [22,21]
  # Posição do Level.
  LEVEL_POS = [0,10] 
  # Posição do Fogo.
  FIRE_POS = [0,10]
  # Ajuste de espaço entre os números. 
  NUMBER_SPACE = -10
  # Velocidade da animação do medidor.
  OVD_METER_FLOW_SPEED = 5
  # Nome do overdrive
  OVERDRIVE_NAME = "Overdrive"  
  # Limite do medidor para ativar o overdrive.
  OVD_GAUGE_MAX = 100
  # Level inicial de overdrive nos personagens.
  #
  # INITIAL_OVDMAX_LEVEL = {A=>B, A=>B, A=>B,... }
  # A - ID do personagem.
  # B - Level maximo do overdrive.
  INITIAL_OVDMAX_LEVEL = {
  2=>2  #Alice Level 2
  }
  #Não mexa!
  OVERDRIVE_ACTION = []
  #Definição das habilidades ativadas em cada level de overdrive.
  #
  # OVERDRIVE_ACTION[A] = {B=>C, B=>C, B=>C,...}
  #
  # A - ID do personagem
  # B - ID do level do overdrive
  # C - ID da habilidade a ser ativada
  OVERDRIVE_ACTION[2] = {
  1=>22,   #Mega Flare
  2=>23    #Icicle Disaster
  }
  #OVERDRIVE_ACTION[2] = {1=>5, 2=>19 }
  #OVERDRIVE_ACTION[3] = {1=>15, 2=>9 , 3=>19, 4=>95, 5=>39}
  #OVERDRIVE_ACTION[4] = { }
  
  #Quantidade padrão ganho no medidor de overdrive ao acarretar dano no battler.
  OVD_DEFAULT_GAIN = 3
  # Definição especifica de overdrive ganho baseado na ID da skill.
  #
  # OVD_GAIN = { A=>B, A=>B, A=>B, ....}
  # A - ID da skill.
  # B - Valor do overdrive ganho.
  OVD_GAIN = {
  1=>3,
  22=>0,
  23=>0
  }
  # Definição dos botões que deverão ser pressionados simultaneamentes para
  # ativar o overdrive. 
  # Defina como nil se quiser desativar o sistema de botão duplo.
  #
  # OVD_BUTTON_2 = nil
  #
  OVD_BUTTON_1 = Input::C
  OVD_BUTTON_2 = Input::X
end

#===============================================================================
# ■ Game Temp
#===============================================================================
class Game_Temp
  
  attr_accessor :pressed_ovd_button
  #--------------------------------------------------------------------------
  # ● Iinitialize
  #--------------------------------------------------------------------------        
  alias xas_ovd_initialize initialize
  def initalize
      @pressed_ovd_button = false
      xas_ovd_initialize
  end  
end
#===============================================================================
# ■ Game Actor
#===============================================================================
class Game_Actor < Game_Battler
  include MOG_XAS_OVERDRIVE
  
  attr_accessor :ovd_level
  attr_accessor :ovd_maxlevel
  attr_accessor :ovd_gauge
  
  #--------------------------------------------------------------------------
  # ● Iinitialize
  #--------------------------------------------------------------------------      
  alias xas_ovd_initialize initialize
  def initialize(actor_id)
      xas_ovd_initialize(actor_id)
      @ovd_level = 0
      @ovd_maxlevel = 0
      @ovd_gauge = 0
      check_initial_ovd_level      
  end  
  
  #--------------------------------------------------------------------------
  # ● Check Initial Ovd Level
  #--------------------------------------------------------------------------          
  def check_initial_ovd_level  
      initial_level = INITIAL_OVDMAX_LEVEL[@actor_id]
      if initial_level != nil
         @ovd_maxlevel = initial_level
      end  
  end  
  
  #--------------------------------------------------------------------------
  # ● OVD Level
  #--------------------------------------------------------------------------        
  def ovd_level
      n = [[@ovd_level , 0].max, @ovd_maxlevel].min
      return n    
  end  
  
  #--------------------------------------------------------------------------
  # ● OVD MaxLevel
  #--------------------------------------------------------------------------          
  def ovd_maxlevel
     return @ovd_maxlevel
  end  
  
  #--------------------------------------------------------------------------
  # ● OVD Gauge
  #--------------------------------------------------------------------------            
  def ovd_gauge
      n = [[@ovd_gauge , 0].max, OVD_GAUGE_MAX].min
      return n
  end      
    
  #--------------------------------------------------------------------------
  # ● Gain Ovd
  #--------------------------------------------------------------------------              
  def gain_ovd(value)
      return unless can_gain_ovd?
      @ovd_gauge += value
      gain_ovd_level(1) if can_ovd_levelup?
  end
  
  #--------------------------------------------------------------------------
  # ● Gain Ovd Level
  #--------------------------------------------------------------------------                
  def gain_ovd_level(value)
      @ovd_level += value
      @ovd_gauge = 0
      if @ovd_level >= @ovd_maxlevel   
         @ovd_gauge = OVD_GAUGE_MAX   
         @ovd_level = @ovd_maxlevel   
      end   
  end  
  
  #--------------------------------------------------------------------------
  # ● Can Ovd Level UP
  #--------------------------------------------------------------------------                  
  def can_ovd_levelup?
      return false if @hp == 0
      return false if @ovd_gauge < OVD_GAUGE_MAX
      return true
  end
  
  #--------------------------------------------------------------------------
  # ● Can Gain OVD
  #--------------------------------------------------------------------------                
  def can_gain_ovd?
      return false if @ovd_level == @ovd_maxlevel 
      return false if @hp == 0
      return false if @ovd_gauge == OVD_GAUGE_MAX
      return true
  end  
  
end

#===============================================================================
# ■ XRXS_BattlerAttachment
#==============================================================================
module XRXS_BattlerAttachment 
  
  #--------------------------------------------------------------------------
  # ● Action Effect
  #--------------------------------------------------------------------------  
  alias x_ovd_shoot_effect_after_damage shoot_effect_after_damage
  def shoot_effect_after_damage(skill, bullet, user)
      check_ovd_skill(skill, user)
      x_ovd_shoot_effect_after_damage(skill, bullet, user)
  end
  
  #--------------------------------------------------------------------------
  # ● Check OVD Skill
  #--------------------------------------------------------------------------    
  def check_ovd_skill(skill, user)
      return if self.battler.damage <= 0
      ovd_point = MOG_XAS_OVERDRIVE::OVD_GAIN[skill.id]
      ovd_point = MOG_XAS_OVERDRIVE::OVD_DEFAULT_GAIN  if ovd_point == nil      
      if user.battler.is_a?(Game_Actor) and self.battler.is_a?(Game_Enemy) and not
         self.battler.no_damage_pop
         user.battler.gain_ovd(ovd_point)
      elsif self.battler.is_a?(Game_Actor)
         self.battler.gain_ovd(ovd_point)        
      end           
  end  
  
  #--------------------------------------------------------------------------
  # ● Execute Attack Effect After Damage
  #--------------------------------------------------------------------------      
  alias x_ovd_execute_attack_effect_after_damage execute_attack_effect_after_damage
  def execute_attack_effect_after_damage(attacker)
      x_ovd_execute_attack_effect_after_damage(attacker)
      check_ovd_attack(attacker)
  end  
  
  #--------------------------------------------------------------------------
  # ● Check Ovd Attack
  #--------------------------------------------------------------------------        
  def check_ovd_attack(attacker)
      return if self.battler.damage <= 0
      return if self.battler.is_a?(Game_Enemy)
      ovd_point = MOG_XAS_OVERDRIVE::OVD_DEFAULT_GAIN  
      self.battler.gain_ovd(ovd_point)         
  end  
end  


#==============================================================================
# ■ Game_Player 
#==============================================================================
class Game_Player < Game_Character
   include MOG_XAS_OVERDRIVE 
  #--------------------------------------------------------------------------
  # ● Update Action Command
  #--------------------------------------------------------------------------  
  alias ovd_update_action_command update_action_command
  def update_action_command
      ovd_update_action_command
      update_overdrive_button
  end
  
  #--------------------------------------------------------------------------
  # ● Update Overdrive Button
  #--------------------------------------------------------------------------    
  def update_overdrive_button
      button_1 = OVD_BUTTON_1
      button_2 = OVD_BUTTON_2
      if button_1 == nil and button_2 == nil
         return
      elsif button_1 != nil and button_2 != nil
         update_ovd_dual_button(button_1,button_2)   
         return
      else   
         button = button_1
         button = button_2 if button == nil
         update_ovd_button(button)
      end  
  end  
  
  #--------------------------------------------------------------------------
  # ● Update OVD Button
  #--------------------------------------------------------------------------    
  def update_ovd_button(button)
      if Input.trigger?(button)
         execute_overdrive_action
         return
      end
      $game_temp.pressed_ovd_button = false 
  end
  #--------------------------------------------------------------------------
  # ● Update OVD Dual Button
  #--------------------------------------------------------------------------    
  def update_ovd_dual_button(button_1,button_2)   
      if Input.press?(button_1) and Input.press?(button_2)
         execute_overdrive_action 
         return
       end
       $game_temp.pressed_ovd_button = false  
  end  
  
  #--------------------------------------------------------------------------
  # ● Execute Overdrive Action
  #--------------------------------------------------------------------------      
  def execute_overdrive_action
      return unless can_use_overdrive_command?
      $game_temp.pressed_ovd_button = true
      action_id = OVERDRIVE_ACTION[self.battler.id]
      if action_id != nil and action_id[self.battler.ovd_level] != nil
         self.shoot(action_id[self.battler.ovd_level]) 
         self.battler.ovd_level = 0
         self.battler.ovd_gauge = 0               
      end
  end  
  
  #--------------------------------------------------------------------------
  # ● Can Use Overdrive Command
  #--------------------------------------------------------------------------        
  def can_use_overdrive_command?
      return false if $game_system.command_enable == false
      return false if $game_temp.pressed_ovd_button 
      return false if self.battler.shield
      return false if self.battler.cast_action[4] > 0
      return false if self.battler.ovd_level == 0
      return true
  end  
  
end  
#==============================================================================
# ■ Overdrive
#==============================================================================
class Overdrive
  include MOG_XAS_OVERDRIVE
   
  #--------------------------------------------------------------------------
  # ● Initialize  
  #--------------------------------------------------------------------------  
  def initialize
      @actor = $game_party.members[0]
      return if @actor == nil
      create_layout
      create_meter
      create_level
      create_fire
  end
    
  #--------------------------------------------------------------------------
  # ● Restart Hud
  #--------------------------------------------------------------------------    
  def restart_hud
      dispose
      initialize
  end  
  
  #--------------------------------------------------------------------------
  # ● Create Layout
  #--------------------------------------------------------------------------    
  def create_layout
      @layout_sprite = Sprite.new
      @layout_sprite.bitmap = Cache.system("XAS_Ovd_Layout")
      @layout_sprite.z = 150
      @layout_sprite.x = HUD_POSITION[0] 
      @layout_sprite.y = HUD_POSITION[1] 
  end
  
  #--------------------------------------------------------------------------
  # ● Create Meter
  #--------------------------------------------------------------------------      
  def create_meter
      @meter_flow = 0
      @meter_image = Cache.system("XAS_Ovd_Meter")
      @meter_range = @meter_image.width / 3
      @meter_height = @meter_image.height / 2 
      @meter_sprite = Sprite.new
      @meter_sprite.bitmap = Bitmap.new(@meter_image.width,@meter_image.height)
      @meter_sprite.z = 151
      @meter_sprite.x = HUD_POSITION[0] + METER_POS[0]
      @meter_sprite.y = HUD_POSITION[1] + METER_POS[1]
      update_gauge
  end 

  #--------------------------------------------------------------------------
  # ● Create Level
  #--------------------------------------------------------------------------        
  def create_level
      @number_image = Cache.system("XAS_Ovd_Number")
      @number_sprite = Sprite.new
      @number_sprite.bitmap = Bitmap.new(@number_image.width,@number_image.height)
      @number_sprite.z = 153
      @number_sprite.y = HUD_POSITION[1] + LEVEL_POS[1]
      @number_cw = @number_image.width / 10
      @number_ch = @number_image.height  
      @number_sc = @number_cw + NUMBER_SPACE
      refresh_level
  end
  
  #--------------------------------------------------------------------------
  # ● Create Fire
  #--------------------------------------------------------------------------          
  def create_fire
      @fire_flow = 0
      @fire_flow_speed = 8
      @fire_image = Cache.system("XAS_Ovd_Fire")
      @fire_width = @fire_image.width / 4    
      @fire_sprite = Sprite.new
      @fire_sprite.bitmap = Bitmap.new(@fire_image.width,@fire_image.height)
      @fire_sprite.z = 154
      @fire_sprite.y = HUD_POSITION[1] + FIRE_POS[1]
      @fire_sx = @fire_width
      update_fire
  end    
  
  #--------------------------------------------------------------------------
  # ● Uppdate Fire
  #--------------------------------------------------------------------------      
  def update_fire
      @fire_sprite.x = @meter_width + HUD_POSITION[0] + FIRE_POS[0] + @fire_sx
      @fire_flow_speed += 1
      return if  @fire_flow_speed < 8
      @fire_sprite.bitmap.clear
      @fire_flow_speed = 0
      @fire_flow += 1
      @fire_flow = 0 if @fire_flow > 3
      src_rect_back = Rect.new(@fire_width * @fire_flow, 0,@fire_width, @fire_image.height)
      @fire_sprite.bitmap.blt(0,0, @fire_image, src_rect_back)           
  end
  
  #--------------------------------------------------------------------------
  # ● Dispose
  #--------------------------------------------------------------------------    
  def dispose
      return if @actor == nil
      @layout_sprite.bitmap.dispose
      @layout_sprite.dispose
      @meter_sprite.bitmap.dispose
      @meter_sprite.dispose
      @meter_image.dispose
      @number_sprite.bitmap.dispose
      @number_sprite.dispose
      @number_image.dispose
      @fire_sprite.bitmap.dispose
      @fire_sprite.dispose
      @fire_image.dispose
  end 
  
  #--------------------------------------------------------------------------
  # ● Update
  #--------------------------------------------------------------------------      
  def update
      return if @actor == nil
      refresh_level if can_refresh_level?
      update_visible
      update_gauge
      update_fire
  end
  
  #--------------------------------------------------------------------------
  # ● Can Refresh Level
  #--------------------------------------------------------------------------        
  def can_refresh_level?
       return true if @ovd_level_old != @actor.ovd_level
       return true if @ovd_maxlevel_old != @actor.ovd_maxlevel
       return false
  end
  #--------------------------------------------------------------------------
  # ● Update Visible
  #--------------------------------------------------------------------------      
  def update_visible
      vis = $game_system.enable_hud
      vis = false if @actor.ovd_maxlevel == 0
      @layout_sprite.visible = vis
      @meter_sprite.visible = vis
      @number_sprite.visible = vis
      @fire_sprite.visible = vis
  end  
  
  #--------------------------------------------------------------------------
  # ● Refresh Level
  #--------------------------------------------------------------------------          
  def refresh_level
      @ovd_level_old = @actor.ovd_level
      @ovd_maxlevel_old = @actor.ovd_maxlevel
      @number_sprite.bitmap.clear
      number_text = @actor.ovd_level.abs.to_s.split(//)
      for r in 0..number_text.size - 1
         number_abs = number_text[r].to_i 
         src_rect = Rect.new(@number_cw * number_abs, 0, @number_cw, @number_ch)
         @number_sprite.bitmap.blt(@number_sc *  r, 0, @number_image, src_rect)        
      end      
      vx =  ((@number_sc * number_text.size) / 2) 
      @number_sprite.x = HUD_POSITION[0] + LEVEL_POS[0] - vx
  end  
  
  #--------------------------------------------------------------------------
  # ● Update Gauge
  #--------------------------------------------------------------------------        
  def update_gauge
      @meter_sprite.bitmap.clear
      if @actor.ovd_level == @actor.ovd_maxlevel and
         @actor.ovd_maxlevel > 0
         @meter_width = @meter_range
         @meter_ch = @meter_height
      else   
         @meter_width = @meter_range * @actor.ovd_gauge / OVD_GAUGE_MAX 
         @meter_ch = 0
      end  
      src_rect = Rect.new(@meter_flow, @meter_ch, @meter_width, @meter_height)
      @meter_sprite.bitmap.blt(0,0, @meter_image, src_rect) 
      @meter_flow += OVD_METER_FLOW_SPEED  
      if @meter_flow >= @meter_image.width - @meter_range
         @meter_flow = 0  
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
  alias xas_ovd_initialize initialize 
  def initialize  
      @ovd = Overdrive.new
      xas_ovd_initialize
  end

  #--------------------------------------------------------------------------
  # ● dispose
  #--------------------------------------------------------------------------
  alias xas_ovd_dispose dispose
  def dispose    
      @ovd.dispose
      xas_ovd_dispose
  end

  #--------------------------------------------------------------------------
  # ● update   
  #--------------------------------------------------------------------------
  alias xas_ovd_update update
  def update   
      @ovd.update
      xas_ovd_update
  end
  
  #--------------------------------------------------------------------------
  # ● Refresh Hud
  #--------------------------------------------------------------------------  
  alias xas_ovd_refresh_hud refresh_hud
  def refresh_hud
      xas_ovd_refresh_hud
      @ovd.restart_hud
  end    
    
end   

$mog_rgss3_xas_overdrive = true