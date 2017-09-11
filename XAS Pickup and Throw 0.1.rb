#==============================================================================
# ■ +++ MOG - XAS PICKUP AND THROW (v1.0) +++
#==============================================================================
# By Moghunter
# http://www.atelier-rgss.com
#==============================================================================
# Sistema de carregar e arremessar eventos, útil para criar puzzles.
#==============================================================================
# Para definir quais os eventos serão arremessáveis basta nomear o evento 
# da seguinte forma.
#
# <ThrowX>
#
# X é a distância que o evento pode ser arremessado.
#
# Exemplo
#
# Event01<Throw4>
#
#==============================================================================
# Sprite do personagem carregando o Objeto (Opcional)
#==============================================================================
# É preciso ter uma imagem do personagem em　posição de carreagar objeto e
# nomear a imagem da sequinte forma.
#
# Character_Name + _Pickup
#
# Exemplo
#
# Actor1_Pickup.png
#==============================================================================
module MOG_PICK_THROW
  #Altura do sprite do objeto carregado.
  SPRITE_POSITION = 32
  #Definição do Som quando o objeto é arremessado. 
  THROW_SE = "Jump2"
  #Definição do Som quando o objeto é carregado. 
  PICK_UP_SE = "Jump1"
  #ID da Switch que desativa o sistema de carregar. 
  DISABLE_PICKUP_SWITCH_ID = 20
  # Definição do botão de carregar objetos.
  PICKUP_BUTTON = Input::C
  # Definição da ID da habilidade que será usada para causar dano.
  THROW_ACTION_ID = 46
end  
 
#==============================================================================
# ■ Game_Temp
#==============================================================================
class Game_Temp
 
  attr_accessor :pickup_lock  
  attr_accessor :pickup_lock_time
  attr_accessor :character_pre_name
  attr_accessor :can_throw
  attr_accessor :throw_position
  
  #--------------------------------------------------------------------------
  # ● initialize
  #--------------------------------------------------------------------------  
  alias mog_pick_initialize initialize
  def initialize
      @pickup_lock = false 
      @pickup_lock_time = 0   
      @character_pre_name = ""
      @can_throw = true
      @throw_position = []
      mog_pick_initialize
  end  
end

#==============================================================================
# ■ Game_Event
#==============================================================================
class Game_Event < Game_Character
  
  #--------------------------------------------------------------------------
  # ● initialize
  #--------------------------------------------------------------------------
  alias mog_pickup_initialize initialize
  def initialize(map_id, event)
      mog_pickup_initialize(map_id, event)    
      @throw_active = false
      if event.name =~ /<Throw(\d+)>/i
         @throw = $1.to_i
      end      
  end      
end

#==============================================================================
# ■ Game_Character
#==============================================================================
class Game_Character < Game_CharacterBase
 
  attr_accessor :throw_active
  attr_accessor :throw
  
  #--------------------------------------------------------------------------
  # ● initialize
  #--------------------------------------------------------------------------  
  alias x_pickup_initialize initialize
  def initialize
      @throw_active = false
      @throw = 0
      x_pickup_initialize
  end  
  
  #--------------------------------------------------------------------------
  # ● Update Battler
  #--------------------------------------------------------------------------      
  alias x_update_update_battler update_battler
  def update_battler  
      update_pickup_parameter
      x_update_update_battler
  end  
  
  #--------------------------------------------------------------------------
  # ● Update Pickup Parameter
  #--------------------------------------------------------------------------      
  def update_pickup_parameter
      return unless @throw_active
      @knock_back_duration = 30
  end    
  
 #--------------------------------------------------------------------------
 # ● Throw Action
 #--------------------------------------------------------------------------
  def throw_action(range)    
      moveto($game_player.x,$game_player.y)
      jump_range = range
      @x = $game_player.x
      @y = $game_player.y
      range.times do 
      unless jumping? 
        case $game_player.direction
           when 6             
             jump(jump_range,0) if throw_range?(jump_range,0,jump_range) 
           when 4
             jump(-jump_range,0) if throw_range?(-jump_range,0,jump_range)
           when 2
             jump(0,jump_range) if throw_range?(0,jump_range,jump_range)
           when 8                       
             jump(0,-jump_range) if throw_range?(0,-jump_range,jump_range)
         end         
         if @x == $game_player.x and @y == $game_player.y and jump_range == 1
            $game_temp.can_throw = false
         end
         jump_range -= 1  
      end               
   end     
 end  
   
 #--------------------------------------------------------------------------
 # ● Throw Range?
 #--------------------------------------------------------------------------
 def throw_range?(x, y,range )  
    x = $game_player.x 
    y = $game_player.y 
    case $game_player.direction   
        when 2
            y += range
        when 6       
            x += range
        when 4  
            x -= range
        when 8
            y -= range 
    end      
    return false if collide_with_characters?(x, y) 
    return false unless map_passable?(x, y,$game_player.direction)   
    return true
  end   
  
  #--------------------------------------------------------------------------
  # ● Blow Effect
  #--------------------------------------------------------------------------        
  alias x_pickup_blow blow
  def blow(d, power = 1)
      $game_map.reset_pickup if self.is_a?(Game_Player)
      x_pickup_blow(d, power)
  end  
    
end  

#==============================================================================
# ■ Game_Player
#==============================================================================
class Game_Player < Game_Character  
  include MOG_PICK_THROW

  #--------------------------------------------------------------------------
  # ● Can use Command
  #--------------------------------------------------------------------------        
  alias x_pickup_can_use_command can_use_command?
  def can_use_command?
      return false if $game_temp.pickup_lock
      return false if $game_temp.pickup_lock_time > 0
      x_pickup_can_use_command
  end
  
  #--------------------------------------------------------------------------
  # ● Update Player after Movement
  #--------------------------------------------------------------------------      
  alias x_pickup_update_player_after_movement update_player_after_movement
  def update_player_after_movement
      update_pickup_sprite
      x_pickup_update_player_after_movement
  end
  
  #--------------------------------------------------------------------------
  # ● Update Pickup Sprite
  #--------------------------------------------------------------------------        
  def update_pickup_sprite
      if $game_temp.pickup_lock_time > 0
         $game_temp.pickup_lock_time -= 1 
         make_pose("_Throw", 2)    
      elsif $game_temp.pickup_lock
         make_pose("_Pickup", 2)    
      end  
  end  

  #--------------------------------------------------------------------------
  # ● Update Player Before Movement
  #--------------------------------------------------------------------------  
  alias pickup_update_pickup_command update_player_before_movement
  def update_player_before_movement
      pickup_update_pickup_command 
      update_pickup_command
  end
  
  #--------------------------------------------------------------------------
  # ● Update Pickup Command
  #--------------------------------------------------------------------------  
  def update_pickup_command
      if Input.trigger?(PICKUP_BUTTON)
         throw_event if can_check_throw_event?
         check_event_pickup([0,1,2]) if can_check_pickup_event?
      end
  end
    
  #--------------------------------------------------------------------------
  # ● Check Action Event
  #--------------------------------------------------------------------------
  alias mog_pickup_check_action_event check_action_event
  def check_action_event
      return if $game_temp.pickup_lock_time > 0 or $game_temp.pickup_lock
      mog_pickup_check_action_event
  end  
    
  #--------------------------------------------------------------------------
  # ● Can Check Pickup Event
  #--------------------------------------------------------------------------  
  def can_check_pickup_event?
      return false if $game_temp.pickup_lock 
      return false if $game_temp.pickup_lock_time > 0     
      return false if $game_map.interpreter.running?
      return false if $game_message.visible
      return false if $game_switches[DISABLE_PICKUP_SWITCH_ID] 
      return false if self.action != nil
      return false if self.stop
      return false if self.knockbacking?
      return true
  end    
  
  #--------------------------------------------------------------------------
  # ● Can Check Throw Event
  #--------------------------------------------------------------------------    
  def can_check_throw_event?
      return false if $game_temp.pickup_lock == false
      return false if $game_temp.pickup_lock_time > 0 
      return false if $game_map.interpreter.running?
      return false if $game_message.visible
      return false if $game_switches[DISABLE_PICKUP_SWITCH_ID] 
      return false if self.action != nil
      return false if self.stop
      return false if self.knockbacking?      
      return true
  end    
  #--------------------------------------------------------------------------
  # ● Reserve Transfer
  #-------------------------------------------------------------------------- 
  alias mog_pickup_reserve_transfer reserve_transfer
  def reserve_transfer(map_id, x, y, direction)
      if $game_temp.pickup_lock == true
         for event in $game_map.events.values
             if event.throw_active == true 
                event.throw_active = false
                case @direction 
                   when 2
                     event.jump(0,-1)     
                   when 4
                     event.jump(1,0)     
                   when 6
                     event.jump(-1,0)     
                   when 8  
                     event.jump(0,1)   
                end     
             end  
         end      
         $game_temp.pickup_lock = false
         $game_temp.pickup_lock_time = 0
      end  
      mog_pickup_reserve_transfer(map_id, x, y, direction)
  end
 
  #--------------------------------------------------------------------------
  # ● Move By Input
  #--------------------------------------------------------------------------  
  alias mog_pickup_move_by_input move_by_input
  def move_by_input
      return if $game_temp.pickup_lock_time > 0 
      mog_pickup_move_by_input
  end  
  
  #--------------------------------------------------------------------------
  # ● Throw Event
  #--------------------------------------------------------------------------  
  def throw_event
      for event in $game_map.events.values
          if event.throw_active and not jumping?
             $game_temp.can_throw = true
             event.throw_action(event.throw) 
             return if $game_temp.can_throw == false
             $game_temp.pickup_lock_time = event.jump_count 
             $game_temp.throw_position[0] = event.x
             $game_temp.throw_position[1] = event.y
             event.throw_active = false
             $game_temp.pickup_lock = false           
             Audio.se_play("Audio/SE/" + THROW_SE, 100, 100)
             action_id = MOG_PICK_THROW::THROW_ACTION_ID
             $game_player.shoot(action_id) unless (event.tool_id > 0 and event.action.first_impact_time > 0)
          end         
      end    
      if event == nil or event.erased or event.dead?
         $game_map.reset_pickup
      end       
  end
  
  #--------------------------------------------------------------------------
  # ● Check Event Pickup
  #--------------------------------------------------------------------------
  def check_event_pickup(triggers)
      front_x = $game_map.x_with_direction(@x, @direction)
      front_y = $game_map.y_with_direction(@y, @direction)
      for event in $game_map.events_xy(front_x, front_y)
          if event.throw > 0 and not (jumping? or event.dead?)
             event.throw_active = true
             $game_temp.pickup_lock = true
             event.jump(0,0)
             $game_temp.pickup_lock_time = event.jump_count 
             event.x = @x
             event.y = @y
             Audio.se_play("Audio/SE/" + PICK_UP_SE, 100, 100)
             @dash_active = false
             @shield = false
             reset_cast_temp 
          end
      end
  end
  
  #--------------------------------------------------------------------------
  # ● Reset Player Parameter
  #--------------------------------------------------------------------------                
  alias xas_pickup_reset_player_parameters reset_player_parameters
  def reset_player_parameters
      xas_pickup_reset_player_parameters
      $game_map.reset_pickup
  end

end

#==============================================================================
# ■ Sprite_Character
#==============================================================================
class Sprite_Character < Sprite_Base  
  include MOG_PICK_THROW
  
  #--------------------------------------------------------------------------
  # ● Update X Effects
  #--------------------------------------------------------------------------              
  alias x_pickup_update_x_effects update_x_effects
  def update_x_effects
      x_pickup_update_x_effects
      update_pickup_position if can_pickup_position?
  end  

  #--------------------------------------------------------------------------
  # ● Can Pickup Position
  #--------------------------------------------------------------------------        
  def can_pickup_position?
      return false if $game_temp.pickup_lock_time > 0
      return false if $game_temp.pickup_lock == false      
      return false if @character.is_a?(Game_Player)
      return false if @character.throw_active == false
      return false if @character.jumping?
      return true
  end    
  
  #--------------------------------------------------------------------------
  # ● Update Pickup Position
  #--------------------------------------------------------------------------      
  def update_pickup_position
      @character.x = $game_player.x
      @character.y = $game_player.y
      @character.bush_depth = 0
      unless @character.direction_fix
          @character.direction = $game_player.direction
      end
      self.x = $game_player.screen_x 
      self.y = $game_player.screen_y - SPRITE_POSITION 
      self.z = $game_player.screen_z + 1
  end
end  

#==============================================================================
# ■ Scene_Map
#==============================================================================
class Scene_Map < Scene_Base
  
  #--------------------------------------------------------------------------
  # ● Call Menu
  #--------------------------------------------------------------------------    
  alias mog_pickup_call_menu call_menu
  def call_menu
      return if $game_temp.pickup_lock == true 
      mog_pickup_call_menu
  end
  
end

#==============================================================================
# ■ Game Interpreter
#==============================================================================
class Game_Interpreter

  #--------------------------------------------------------------------------
  # ● Command 352
  #--------------------------------------------------------------------------      
  alias mog_pickup_command_352 command_352
  def command_352
      return if $game_temp.pickup_lock == true 
      mog_pickup_command_352
  end
     
end     

#==============================================================================
# ■ Game_Map
#==============================================================================
class Game_Map
  
 #--------------------------------------------------------------------------
 # ● XAS Initial Setup
 #--------------------------------------------------------------------------  
  alias x_pickup_xas_initial_setup xas_initial_setup
  def xas_initial_setup(map_id)
      x_pickup_xas_initial_setup(map_id)
      reset_pickup
  end  
  
 #--------------------------------------------------------------------------
 # ● Reset Pickup
 #--------------------------------------------------------------------------  
  def reset_pickup
      for i in $game_map.events.values 
          if i.throw_active
             i.throw_active = false
             i.moveto($game_player.x,$game_player.y)
             i.jump(0,0)             
             i.move_backward
          end   
      end  
      $game_temp.pickup_lock_time = 0
      $game_temp.pickup_lock = false
  end  
end  

#===============================================================================
# ■ Token_Bullet  
#===============================================================================
class Token_Bullet < Token_Event
  
  #--------------------------------------------------------------------------
  # ● Initialize
  #--------------------------------------------------------------------------    
  alias x_pickup_check_tool_effects check_tool_effects
  def check_tool_effects(user,skill,pre_direction)
      x_pickup_check_tool_effects(user,skill,pre_direction)
      throw_setup(user,skill,pre_direction)
  end

  #--------------------------------------------------------------------------
  # ● Throw Setup
  #--------------------------------------------------------------------------  
  def throw_setup(user,skill,pre_direction)
      return if skill.id != MOG_PICK_THROW::THROW_ACTION_ID
      return if $game_temp.pickup_lock_time == 0
      return if user.is_a?(Game_Event)
      self.through = true
      self.moveto($game_temp.throw_position[0], $game_temp.throw_position[1])
      self.character_name = ""
  end
end

$mog_rgss3_xas_pickup_and_throw = true
