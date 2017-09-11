/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 
■■ X A S  - Xiderwong Action System (For Advanced Users)
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 
                                                                       
 X - Xiderowng
 A - Action
 S - System
 
 Created by XIDEROWNG  (XMS / XRXS / ちいさな本屋 / 森穂(もりほ)  
 http://xrxs.at-ninja.jp/
 
 Version 0.1 (RPG Maker VX Ace Version 0.6 re-encode for RPG Maker MV (Javascript)
 Re-encode by Chinoshu
 Comment translation to English by Chinoshu
 https://github.com/suhayltfaris
 
===============================================================================
 ■ TERMS OF USE
===============================================================================

  English

 - You need to give credits to Xiderowng.
 - You need to link the official Xiderowng website.
   http://xrxs.at-ninja.jp/
 
  Português 

 > Termos de uso <
 - Você precisa dar os creditos para o Xiderowng.
 - Você precisa divulgar a página oficial do Xiderowng.
   http://xrxs.at-ninja.jp/ 
   
   Japanese / 日本語
   
 > 利用規約 <
 - Xiderowng に信用を与える必要があります。
 - 公式の Xiderowng サイトをリンクする必要があります。
   http://xrxs.at-ninja.jp/
   
   Arabic / العربية
   
 > شروط الاستخدام <
 - تحتاج إلى إعطاء القروض إلى Xiderowng.
 - تحتاج إلى ربط الموقع Xiderowng الرسمية.
   http://xrxs.at-ninja.jp/
   
   Dutch / Nederlands
   
 > Gebruiksvoorwaarden <
 - Je moet credits te geven aan Xiderowng.
 - U wilt koppelen de officiële website van de Xiderowng.
   http://xrxs.at-ninja.jp/
   
   Cantonese (Traditional) / 粵語
 
 > 使用條款 <
 - 您需要確認過 Xiderowng
 - 你要將官方嘅 Xiderowng 網站連結
   http://xrxs.at-ninja.jp/
   
   Chinese (Simplified) / 中文
   
 > 使用条件 <
 - 您需要向 Xiderowng 提供信贷  
 - 您需要将官方的 Xiderowng 网站链接
   http://xrxs.at-ninja.jp/
   
 
===============================================================================
 ■ XAS Hero Edition ACE (Ver Experimental 0.5  - 2012 / 01 / 04) ( Ver Experimental
 0.1 (Re-encode to RPG Maker MV) - 05 / 14 / 2017)                                                
===============================================================================
 
 Updates for XAS Hero Edtion.
 http://www.atelier-rgss.com/ 

 XAS Tutorials. 
 http://xasabs.wordpress.com/
 
===============================================================================
 ■ MAIN FEATURES                                                          
===============================================================================
  - Active battle system on a map (or) and interaction with the scenery.
   
===============================================================================
 ■ History 
===============================================================================
  (V 0.1)
   - Initial introduction of XAS Hero Edition for Rpg Maker MV.
   - Trial version for fixing bugs, glitches and performance testing.
*/

/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 
 XAS - SETUP
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 
===============================================================================
 ■ XAS SYSTEM SETTINGS
===============================================================================
 Disable one of the systems below if you have any problems of compatibility with 
 other script systems, or performance problem if you do not want to use any of the 
 systems below.
-------------------------------------------------------------------------------
*/

var XAS_SYSTEM = (function () {
  // Activate the battle system, set to False; if you want to use just the tooling 
  // system (interaction with the scenario).
  // If you want to disable the battle system in the game use the command below.
  //
  // $game_system.xas_battle = X
  //
  var BATTLE_SYSTEM = true; 
  // Enable the display of damage. (Sprite). 
  var DAMAGE_POP = true;
  // Activate the actions pose system.
  var CHARACTER_POSE_NAME = true;
  // Activate the system sprites
  var CHARACTER_SPRITE_EFFECTS = true;
  // Activate the dash system. XAS.
  var DASH_SYSTEM = true;
  // Activate the diagonal system to the player (Allows Diagonal Movement.
  var PLAYER_DIAGONAL_MOVEMENT  = true;
  // Activate the system of diagonal to the event 
  // (Event Modifier to allow Diagonal Movement).
  var EVENT_DIAGONAL_MOVEMENT  = true;
  // Activate the system of conditions for the battler.
  var STATE_SYSTEM = true;
  // Definition of the map that will be the events of tools.
  // Accesses MAP_ID 1 to obtain event handlers for tools.
  var ACTION_TEMPLATE_MAP_ID = 1;
  // ID of the variable definition that matches the ID of the tool,
  // This ID serves to create interactive events with the tools.
  var HIT_ID = 3;
}());

/*
===============================================================================
 ■ XAS KEY SETTINGS
===============================================================================
*/

var XAS_BUTTON = (function () {
  // Attack Key.
  var ACTION_1_BUTTON = Input::J;
  // Menu Key.
  var ACTION_2_BUTTON = Input::Q;
  // Skill Key.
  var SKILL_BUTTON = Input::K; 
  // Item Key.
  var ITEM_BUTTON = Input::L;
  // Dash Key.
  var DASH_BUTTON = Input::Shift;
  // Change Character Key.
  var CHANGE_LEADER_BUTTON = Input::R;
  // Action Key 1 enabler.
  var ENABLE_ACTION_1_BUTTON = true;
  // Action Key 2 Enabler.  
  var ENABLE_ACTION_2_BUTTON = true;
  // Skill Key Enabler.
  var ENABLE_SKILL_BUTTON = true;
  // Item Key Enabler.
  var ENABLE_ITEM_BUTTON = true;
  // Dash Key Enabler. 
  var ENABLE_DASH_BUTTON = true;
  // Change Character Key Enabler.  
  var ENABLE_CHANGE_LEADER_BUTTON = true;
}());

/*
===============================================================================
 ■ WORD SETTING
===============================================================================
 XAS word pop-up enablers.
-------------------------------------------------------------------------------
*/

var XAS_WORD = (function () {
  // Word pop-up Enabler.
  var ENABLE_WORD = true;
  // Guard Word Pop-up.
  var GUARD = "Guard";
  // No Mana Pop-up.
  var NO_MP = "No MP";
  // No Item Pop-up.
  var NO_ITEM = "No Item";  
  // Level Up Pop-up(May be unused in current project).
  var LEVEL_UP = "Level Up";
  // Silenced(Sealed) Pop-up.
  var SEAL = "Sealed!";
  // Invincible(Damage Immune) Pop-up.
  var INVINCIBLE = "Invincible!";
  // Gained Exp(Ex. 150 Exp) Pop-up(May be unused in current project.
  var EXP = "Exp";
  // Evaded(Dodge) Pop-up.
  var EVADED = "Evaded!";
  // Missed(No hit) Pop-up.
  var MISSED = "Missed!";
  // Counter(Return Damage) Pop-up.
  var COUNTER = "Counter";
  // Reflect(Return Damage) Pop-up.
  var REFLECT = "Reflected";
}());

/*
===============================================================================
 ■ XAS DAMAGE POP
===============================================================================
 Damage Sprites Variables.
-------------------------------------------------------------------------------
*/

var XAS_DAMAGE_POP = (function () {
  // Damage Font.
  var DAMAGE_FONT_NAME = "Georgia";
  // Damage Font Size.
  var DAMAGE_FONT_SIZE = 22;
  // Bold font enabler.
  var DAMAGE_FONT_BOLD = true;
  // Italic font enabler.
  var DAMAGE_FONT_ITALIC = true;
  // Zooms in font when a critical hit occurs.
  var DAMAGE_CRITICAL_ZOOM = true;
  // Exp and Gold pop-up enabler (May not be used in current project.)
  var DAMAGE_EXP_GOLD_POP = true; 
  // Status effect Pop-up enabler.
  var DAMAGE_STATE_POP = true;
  // Item pop-up enabler.
  var DAMAGE_ITEM_POP = true;
  // Default damage font color.
  var DAMAGE_DEFAULT_FONT_COLOR = Color.new(255, 255, 255);
  // Default exp gain font color (May not be used in current project.)
  var DAMAGE_EXP_FONT_COLOR = Color.new(0, 255, 100);
  // Default gold gain font color (May not be used in current project.)
  var DAMAGE_GOLD_FONT_COLOR = Color.new(255, 255, 50);
  // Default item pick-up font color (May not be used in current project.)
  var DAMAGE_ITEM_FONT_COLOR = Color.new(55, 55, 250);
}());

/*
===============================================================================
 ■ SOUND SETTING
===============================================================================
 XAS Sound enablers.
-------------------------------------------------------------------------------
*/

var XAS_SOUND = (function () {
  // Sound on item drop (May not be used in current project.)  
  ITEM_DROP = "Key";
  // SOund on level up (May not be used in current project.)
  var LEVEL_UP = "Chime1";
  // Insufficient mana cost sound.
  var ACTION_COST = "Cursor1";
}());

/*
===============================================================================
 ■ ANIMATION SETTING
===============================================================================
 System definition of animations of XAS.
 If you do not want to use the animations set to 0 (Zero).
-------------------------------------------------------------------------------
*/

var XAS_ANIMATION = (function () {
  // Guard animation.
  var GUARD_ANIMATION_ID = 127;
  //Change character animation.
  var CHANGE_LEADER_ANIMATION_ID = 135;
  // Invincible animation.
  var INVINCIBLE_ANIMATION_ID = 36;
  // Charge weapon animation (Melee).
  var CHARGE_ANIMATION1_ID = 155;
  // Charge weapon animation (Ranged). 
  var CHARGE_ANIMATION2_ID = 123;
  // Charge spell animation.
  var CAST_TIME_ANIMATION_ID = 120;
  // Load speed of animations.
  var LOOP_ANIMATIONS_SPEED = 60;
  // Reflect damage animation.
  var REFLECT_ANIMATION_ID = 128;
}());

/*
===============================================================================
 ■ GENERAL BATTLER SETTING
===============================================================================
 Variables for XAS Battle System
-------------------------------------------------------------------------------
*/

var XAS_BA = (function () {
  // Disables change character key for 10 seconds.
  var CHANGE_LEADER_WAIT_TIME = 10;
  // Leave the hud visible when starting the game.
  // You can enable or disable the hud using the code below.
  // $game_system.hud_visible = true
  var HUD_VISIBLE_AT_STARTUP = false;
  // Key usage for quick-actions page. 
  var SENSOR_SELF_SWITCH = "E";
  // Change page animation speed for quick-actions menu.
  var DEFAULT_SENSOR_RANGE_VARIABLE_ID = 4;
  // Unknown time variable (Assuming time til revive once a character has died in combat.)
  var DEFAULT_KNOCK_BACK_DURATION = 60;
  // Unknown knockback variable (Assuming activates a screen/HUD shake when character dies
  // or when attempting to switch to a fallen character; has been set to false by default.)
  var KNOCKBACKING_SHAKE = false;
  // Base movement speed variable.
  var BASE_MOVE_SPEED = 4.2;
  // Increased movement while dashing variable.
  var DASH_MOVE_SPEED = 0.6;
  // Unknown diagonal movement variable (Assuming disables diagonal movement after a set time.) 
  var DIAGONAL_DURATION_ENABLE = true;
  // Unknown diagonal movement time variable (Assuming time til diagonal movement is available
  // after unknown effect occurs.)
  var DIAGONAL_DURATION = 15;
  // Variable to decide how exp is split amongst party(May not be used in current project.)
  // 0 - EXP is only gained by the character which killed the enemy.
  // 1 - EXP is allocated to the party, EXP handled by an integral value.
  // 2 - EXP is divided by party number (will only be two characters for current project.)
  var EXP_TYPE = 0;
  // Time variable for when treasure/items will fade away(May not be used in current project.)
  var TREASURE_ERASE_TIME = 5;
  // Enables variable for treasure/item sprites to fade away (May not be used in current project.)
  var FADE_TREASURE_SPRITE = true;
  // Enables animation for treasure/item sprites to levitate (May not be used in current project.)
  var FLOAT_TREASURE_SPRITE = true;
  // Secure the balloon's position independent of the actual height of the sprite (Unknown Ballon Variable.)
  var FIX_BALLOON_POSITION = true;
  // Fixes ballon height to a set amount (Unknown Ballon Height Variable.)
  var BALLOON_HEIGHT = 32;
}());

/*
===============================================================================
 ■ ENEMY SETTING
===============================================================================
*/

var XAS_BA_ENEMY = (function () {
	
  /*	
  // Definition of what skills the enemy will be invulnerable from damage.
  // INVUNERABLE_ACTIONS = { A=>[B,B,B,B],  A=>[B,B,B,B], ...}
  // A - ID of the enemy.
  // B - ID of the skill.
  */
  
  var INVUNERABLE_ACTIONS = {
	6=>[39,40,41,42,43],
	7=>[24,25,26,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],
	8=>[1,2,3,4,5,6,7,11,12,13,14,15,16,17,18,19,20,21,24,25,26],
	9=>[39,40,41,42,43],
	10=>[39,40,41,42,43],
	11=>[39,40,41,42,43]
  };
  
  /*
   Definition of what direction the enemy will be able to guard.
   GUARD_DIRECTIONS = { A=>[B],  A=>[B,B,B,B], ...}
   A - ID of the enemy. 
   B - Direction of skills that will be guarded. 
       -> 2 = Below.   -> 4 = Left.
       -> 6 = Right.  -> 8 = Above.
  */  
  
  var GUARD_DIRECTIONS = {
  };
  
  /*
   Definition of Counter Attack skills.
   COUNTER_ATTACK = { A=>[B,B,B,B],  A=>[B,B,B,B], ...}
  */
  
  var COUNTER_ATTACK = {
  };
  
}());

/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 ■ INITIALIZE
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


===============================================================================
 ■ Game_Temp
===============================================================================
*/

class Game_Temp
  attr_accessor :change_leader_wait_time
  attr_accessor :reset_battler_time
  attr_accessor :tool_event
  attr_accessor :animation_garbage
  
  /*
  --------------------------------------------------------------------------
   ● Initialize
  --------------------------------------------------------------------------
  */
  
  alias xas_initialize initialize 
  def initialize
      @change_leader_wait_time = 0
      @reset_battler_time = 0
      @tool_event = nil
      @animation_garbage = []
      xas_initialize
  end
  
end

#===============================================================================
# ■ Game_System
#===============================================================================
class Game_System
  attr_accessor :tools_on_map
  attr_accessor :old_interpreter_running
  attr_accessor :hud_visible
  attr_accessor :enable_hud
  attr_accessor :command_enable
  attr_accessor :pre_leader_id
  attr_accessor :xas_battle
  #--------------------------------------------------------------------------
  # ● Initialize
  #--------------------------------------------------------------------------   
  alias x_initialize initialize
  def initialize
      @tools_on_map = []
      @old_interpreter_running = false
      @hud_visible = XAS_BA::HUD_VISIBLE_AT_STARTUP
      @enable_hud = false
      @command_enable  = true
      @pre_leader_id = 0
      @xas_battle = XAS_SYSTEM::BATTLE_SYSTEM
      x_initialize
  end  
end  

#===============================================================================
# ■ Game_Battler
#===============================================================================
class Game_Battler
  attr_accessor :damage_pop
  attr_accessor :damage
  attr_accessor :damage_type
  attr_accessor :critical
  attr_accessor :invunerable_duration
  attr_accessor :shield
  attr_accessor :invunerable_actions
  attr_accessor :guard_directions
  attr_accessor :guard
  attr_accessor :invunerable
  attr_accessor :x_combo
  attr_accessor :cast_action
  attr_accessor :defeated
  attr_accessor :death_zoom_effect
  attr_accessor :counter_action
  attr_accessor :knockback_duration 
  attr_accessor :hp_damage
  attr_accessor :mp_damage
  
 #--------------------------------------------------------------------------
 # ● Initialize
 #--------------------------------------------------------------------------  
  alias x_initialize initialize 
  def initialize
      @damage = 0
      @damage_pop = false
      @damage_type = 0
      @critical = false
      @invunerable_duration = 0
      @shield = false
      @invunerable_actions = []
      @guard_directions = []
      @guard = true
      @invunerable = false
      @x_combo = [0,-1,0]
      @defeated = false
      @death_zoom_effect = 0
      @cast_action = [0,0,0,0,0]
      @counter_action = [0,0,true]
      @knockback_duration = XAS_BA::DEFAULT_KNOCK_BACK_DURATION
      x_initialize
  end
  
 #--------------------------------------------------------------------------
 # ● Add Invunerable Actions
 #--------------------------------------------------------------------------     
 def add_inv(action_id = 0)
     return if action_id == nil or action_id <= 0
     return if @invunerable_actions.include?(action_id)
     @invunerable_actions.push(action_id)     
 end
 
 #--------------------------------------------------------------------------
 # ● Remove Invunerable Actions
 #--------------------------------------------------------------------------     
 def remove_inv(action_id = 0)
     return if action_id == nil or action_id <= 0
     return unless @invunerable_actions.include?(action_id)
     @invunerable_actions.delete(action_id)     
 end 
   
 #--------------------------------------------------------------------------
 # ● Add Guard Directions
 #--------------------------------------------------------------------------     
 def add_guard_dir(direction = 0)
     return if direction == nil or direction <= 0
     return if @guard_directions.include?(direction)
     @guard_directions.push(direction)     
 end
 
 #--------------------------------------------------------------------------
 # ● Remove Guard Directions
 #--------------------------------------------------------------------------     
 def remove_guard_dir(direction = 0)
     return if direction == nil or direction <= 0
     return unless @guard_directions.include?(direction)
     @guard_directions.delete(direction)     
 end  
 
end  

#===============================================================================
# ■ Game Actor
#===============================================================================
class Game_Actor < Game_Battler
  
  attr_accessor :x_action1_id
  attr_accessor :x_action2_id
  attr_accessor :skill_id
  attr_accessor :x_item_id
  attr_accessor :x_charge_action
  attr_accessor :old_equipment_id
  attr_accessor :item_id
  attr_accessor :old_level
  attr_reader :actor_id

 #--------------------------------------------------------------------------
 # ● Setup
 #--------------------------------------------------------------------------    
 alias x_setup setup
 def setup(actor_id)
      @x_action1_id = 0
      @x_action2_id = 0
      @skill_id = 0
      @x_item_id = 0
      @item_id = 0
      @x_charge_action = [0,0,0,0]
      @old_level = @level
      @old_equipment_id = [0,0,0,0,0]
      x_setup(actor_id)
 end 
 
 #--------------------------------------------------------------------------
 # ● Display Level Up
 #--------------------------------------------------------------------------     
  alias x_display_level_up display_level_up
  def display_level_up(new_skills)
      return unless $game_party.in_battle 
      x_display_level_up(new_skills)
  end 
 
end

#===============================================================================
# ■ Character 
#===============================================================================
class Game_Character < Game_CharacterBase
  
  attr_accessor :tool_id
  attr_accessor :tool_effect  
  attr_accessor :target
  attr_accessor :target2
  attr_accessor :old_x
  attr_accessor :old_y
  attr_accessor :pre_x
  attr_accessor :pre_y
  attr_accessor :temp_id
  attr_accessor :angle
  attr_accessor :force_action_times
  attr_accessor :force_action
  attr_accessor :move_frequency
  attr_accessor :move_speed
  attr_accessor :direction_fix
  attr_accessor :walk_anime
  attr_accessor :step_anime
  attr_accessor :x
  attr_accessor :y
  attr_accessor :pattern
  attr_accessor :pattern_count  
  attr_accessor :jump_count
  attr_accessor :jump_peak
  attr_accessor :dash_active
  attr_accessor :direction
  attr_accessor :through 
  attr_accessor :bush_depth  
  attr_accessor :blend_type 
  attr_accessor :priority_type  
  attr_accessor :jump_count 
  attr_accessor :zoom_x
  attr_accessor :zoom_y
  attr_accessor :stop
  attr_accessor :force_update
  attr_accessor :treasure_time 
  attr_accessor :treasure_float
  attr_accessor :can_update
  attr_accessor :pre_move_speed
  attr_accessor :knock_back_duration
  attr_accessor :orig_pos_x
  attr_accessor :orig_pos_y
  attr_accessor :shoot_time
  #--------------------------------------------------------------------------
  # ● Initialize
  #--------------------------------------------------------------------------    
  alias x_initialize initialize
  def initialize
      x_initialize
      @tool_id = 0
      @tool_effect = ""
      @target = false
      @target2 = nil
      @old_x = @x
      @old_y = @y
      @pre_x = @x
      @pre_y = @y   
      @orig_pos_x = @x
      @orig_pos_y = @y
      @angle = 0
      @force_action_times = 0
      @force_action = ""
      @dash_active = false
      @zoom_x = 1.00
      @zoom_y = 1.00
      @stop = false
      @force_update = false
      @treasure_time = 0
      @treasure_float = [0,0,0,0]
      @can_update = true
      @temp_id = 0
      @pre_move_speed = @move_speed
      @shoot_time = [0,0]
  end
  
  #--------------------------------------------------------------------------
  # ● Invunerable
  #--------------------------------------------------------------------------      
  def invunerable(enable = false)
      return if @battler == nil or @battler.dead?
      @battler.invunerable = enable
  end  
  
  #--------------------------------------------------------------------------
  # ● Fast Breath
  #--------------------------------------------------------------------------        
  def fast_breath(enable = true)
     return if @battler == nil or @battler.dead?
     @battler.fast_breath_effect = enable
  end
end

#===============================================================================
# ■ Game_Event 
#===============================================================================
class Game_Event < Game_Character
  attr_accessor :target
  attr_reader   :name
  attr_accessor :collision_attack 

 #--------------------------------------------------------------------------
 # ● Object
 #--------------------------------------------------------------------------      
 alias x_event_initialize initialize
 def initialize(map_id, event)
     x_event_initialize(map_id, event)
     @collision_attack = false
     if @event.name =~ /<O(\d+)>/i
        @opacity = $1.to_i  
     end   
     if @event.name =~ /<B(\d+)>/i   
        @blend_type = $1.to_i 
     end  
 end  
   
 #--------------------------------------------------------------------------
 # ● Erase
 #--------------------------------------------------------------------------        
 alias x_event_erase erase 
 def erase
     if self.tool_id > 0
        $game_system.tools_on_map.delete(self.tool_id)
     end   
     x_event_erase
 end     
  
 #--------------------------------------------------------------------------
 # ● Event Name
 #--------------------------------------------------------------------------
  def name
      return @event.name  
  end   
  
end

#===============================================================================
# ■ Game Followers 
#===============================================================================
class Game_Followers
  
 #--------------------------------------------------------------------------
 # ● Initialize
 #--------------------------------------------------------------------------  
  alias x_party_initialize initialize
  def initialize(leader)
      x_party_initialize(leader)
      if $xas_party_system == nil
         @visible = false
      end  
  end  
end  

#===============================================================================
# ■ Game Map
#===============================================================================
class Game_Map  

 #--------------------------------------------------------------------------
 # ● Setup
 #--------------------------------------------------------------------------  
  alias x_initial_setup setup
  def setup(map_id)
      x_initial_setup(map_id)
      xas_initial_setup(map_id)
  end
  
 #--------------------------------------------------------------------------
 # ● XAS Initial Setup
 #--------------------------------------------------------------------------  
  def xas_initial_setup(map_id)
      for actor in $game_party.members
          setup_initial_members(actor)
      end  
  end  
    
 #--------------------------------------------------------------------------
 # ● Setup Initial Membes
 #--------------------------------------------------------------------------    
  def setup_initial_members(actor)
      
  end  
end  


#==============================================================================
# ■ Scene_Map
#==============================================================================
class Scene_Map < Scene_Base
  
  #--------------------------------------------------------------------------
  # ● Call Menu
  #--------------------------------------------------------------------------    
  alias x_call_menu call_menu
  def call_menu
      return if $game_player.action != nil 
      $game_player.reset_charge_temp
      x_call_menu
  end
    
end    
#===============================================================================
# ■ Scene_Refresh
#===============================================================================
class Scene_Refresh
  
 #--------------------------------------------------------------------------
 # ● Main
 #--------------------------------------------------------------------------
  def main
      SceneManager.call(Scene_Map)
  end
end

#==============================================================================
# ■ Game_Player 
#==============================================================================
class Game_Player < Game_Character

 #--------------------------------------------------------------------------
 # ● Leader Changed
 #--------------------------------------------------------------------------  
  def leader_changed?(actor)
      if $game_party.members[0] == nil
         return true if actor != nil
      elsif $game_party.members[0] != nil 
         return true if actor == nil    
         return true if actor.actor_id != $game_party.members[0].actor_id        
      end   
      return false
  end
  
end  
$xas = true


#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ MOVEMENT - DIAGONAL MOVEMENT
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#===============================================================================
# ■ Game Character
#===============================================================================
class Game_CharacterBase
  
  #--------------------------------------------------------------------------
  # ● Set Direction
  #--------------------------------------------------------------------------          
   alias diagonal_set_direction set_direction
   def set_direction(d)
       diagonal_set_direction(d)
       @diagonal_direction = 0
       reset_diagonal
   end
   
end   

#===============================================================================
# ■  Game Character
#===============================================================================
class Game_Character < Game_CharacterBase
  
  attr_accessor :diagonal
  attr_accessor :diagonal_direction
  attr_accessor :sprite_angle_enable
  attr_accessor :diagonal_time
  
  #--------------------------------------------------------------------------
  # ● Initialize
  #--------------------------------------------------------------------------        
  alias diagonal_initialize initialize
  def initialize
      diagonal_initialize
      if XAS_SYSTEM::EVENT_DIAGONAL_MOVEMENT
         @diagonal = true
      else   
         @diagonal = false
      end  
      @diagonal_direction = 0
      @sprite_angle_enable = false
      @diagonal_time = 0
  end  
    
  #--------------------------------------------------------------------------
  # ● Reset Diagonal
  #--------------------------------------------------------------------------            
  def reset_diagonal
      return if @direction_fix
      return if @diagonal == false
      @diagonal_direction = 0    
      @diagonal_time = 0
      @angle = 0 if @sprite_angle_enable
  end  
  
  #--------------------------------------------------------------------------
  # ● Enable Diagonal
  #--------------------------------------------------------------------------            
  def enable_diagonal(dir = 0)
     return if @direction_fix
     return if @diagonal == false
     return if dir == 0
     @diagonal_direction = dir
     @diagonal_time = XAS_BA::DIAGONAL_DURATION
     @angle = 315 if @sprite_angle_enable
  end  
  
  #--------------------------------------------------------------------------
  # ● Turn Upper Right
  #--------------------------------------------------------------------------  
  def turn_upper_right
      enable_diagonal(9)
      @direction = 8 unless @direction_fix
  end  
  
  #--------------------------------------------------------------------------
  # ● Turn Upper Left
  #--------------------------------------------------------------------------  
  def turn_upper_left
      enable_diagonal(7)
      @direction = 4 unless @direction_fix
  end   
  
  #--------------------------------------------------------------------------
  # ● Turn Lower Right
  #--------------------------------------------------------------------------  
  def turn_lower_right
      enable_diagonal(3)
      @direction = 6 unless @direction_fix
  end      
  
  #--------------------------------------------------------------------------
  # ● Turn Lower Left
  #--------------------------------------------------------------------------  
  def turn_lower_left
      enable_diagonal(1)
      @direction = 2 unless @direction_fix
  end   
    
  #--------------------------------------------------------------------------
  # ● Move forward
  #--------------------------------------------------------------------------                
  alias diagonal_move_forward move_forward
  def move_forward
      return if move_forward_diagonal?
      diagonal_move_forward
  end
  
  #--------------------------------------------------------------------------
  # ● Move forward Diagonal?
  #--------------------------------------------------------------------------                  
  def move_forward_diagonal?
      return false if @diagonal == false
      if @diagonal_direction != 0
         case @diagonal_direction
              when 1 #Lower Left
                 move_diagonal(4, 2)
                 @direction = 2
              when 3 #Lower Right
                 move_diagonal(6, 2)
                 @direction = 6
              when 7 #Upper Left
                 move_diagonal(4, 8)
                 @direction = 4
              when 9 #Upper Right
                 move_diagonal(6, 8)
                 @direction = 8
          end
          enable_diagonal(@diagonal_direction)      
         return true
      end  
      return false
  end
  
  #--------------------------------------------------------------------------
  # ● Move Backward
  #--------------------------------------------------------------------------                
  alias diagonal_move_backward move_backward
  def move_backward
      return if move_backward_diagonal?
      diagonal_move_backward
  end
  
  #--------------------------------------------------------------------------
  # ● Move Backward Diagonal?
  #--------------------------------------------------------------------------                  
  def move_backward_diagonal?
      return false if @diagonal == false
      if @diagonal_direction != 0
         last_direction_fix = @direction_fix
         @direction_fix = true       
         case @diagonal_direction
              when 1
                 move_diagonal(6, 8)
                 @direction = 6
              when 3
                 move_diagonal(4, 8)
                 @direction = 4
              when 7
                 move_diagonal(6, 2)
                 @direction = 6
              when 9         
                 move_diagonal(4, 2)
                 @direction = 2
         end
         enable_diagonal(@diagonal_direction)      
         @direction_fix = last_direction_fix
         return true
      end  
      return false
  end  
  
  #--------------------------------------------------------------------------
  # ● Turn Toward Player
  #--------------------------------------------------------------------------
  alias turn_toward_player_diagonal turn_toward_player
  def turn_toward_player
      if @diagonal
         diagonal_turn_toward_player
         return 
      end
      turn_toward_player_diagonal
  end  
  
  #--------------------------------------------------------------------------
  # ● Diagonal Turn Toward Player
  #-------------------------------------------------------------------------- 
  def diagonal_turn_toward_player
      sx = distance_x_from($game_player.x)
      sy = distance_y_from($game_player.y)
      sd = sx.abs - sy.abs
      sdx = sd.abs - sx.abs
      sdy = sd.abs - sy.abs
      return if sx == 0 and sy == 0
      #Turn Upper Right
      if sx < 0 and sy > 0
         if sx.abs > sy.abs and sdx.abs < sd.abs
            set_direction(6)
         elsif sx.abs < sy.abs and sdy.abs < sd.abs
            set_direction(8) 
         else
            turn_upper_right
         end
         enable_diagonal(9)
      #Turn Upper Left
      elsif sx > 0 and sy > 0
         if sx.abs > sy.abs and sdx.abs < sd.abs
            set_direction(4)
         elsif sx.abs < sy.abs and sdy.abs < sd.abs
            set_direction(8)            
         else
            set_direction(4)
            turn_upper_left
         end
         enable_diagonal(7)  
      #Turn Lower Left  
      elsif sx > 0 and sy < 0
         if sx.abs > sy.abs and sdx.abs < sd.abs
            set_direction(4)
         elsif sx.abs < sy.abs and sdy.abs < sd.abs
            set_direction(2)         
         else                    
            turn_lower_left
         end
         enable_diagonal(1)   
       #Turn Lower Right    
       elsif sx < 0 and sy < 0         
         if sx.abs > sy.abs and sdx.abs < sd.abs
            set_direction(6)
         elsif sx.abs < sy.abs and sdy.abs < sd.abs
            set_direction(2)           
         else        
            turn_lower_right
         end
         enable_diagonal(3) 
      elsif sx < 0 
         set_direction(6)
      elsif sx > 0 
         set_direction(4)
      elsif sy > 0 
         set_direction(8)
      elsif sy < 0 
         set_direction(2)   
      end     
  
  end  
 
  #--------------------------------------------------------------------------
  # ● Move toward Player
  #--------------------------------------------------------------------------
  alias move_toward_player_diagonal move_toward_player
  def move_toward_player
      if @diagonal 
         diagonal_move_toward_player
         return  
      end
      move_toward_player_diagonal
  end   
   
  #--------------------------------------------------------------------------
  # ● Diagonal Move Toward Player
  #--------------------------------------------------------------------------  
  def diagonal_move_toward_player
      sx = distance_x_from($game_player.x)
      sy = distance_y_from($game_player.y)
      if sx == 0 and sy == 0
         return
      end
      abs_sx = sx.abs
      abs_sy = sy.abs
      if abs_sx == abs_sy
        rand(2) == 0 ? abs_sx += 1 : abs_sy += 1
      end
      if abs_sx
         if sx < 0 and sy > 0
            move_diagonal(6, 8)
            move_random unless moving?
            enable_diagonal(9) 
         elsif sx > 0 and sy > 0
            move_diagonal(4, 8)
            move_random unless moving?
            enable_diagonal(7) 
         elsif sx > 0 and sy < 0
            move_diagonal(4, 2)
            move_random unless moving?
            enable_diagonal(1) 
         elsif sx < 0 and sy < 0
            move_diagonal(6, 2)
            move_random unless moving?
            enable_diagonal(3) 
         elsif sx < 0 
            move_straight(6)
         elsif sx > 0 
            move_straight(4)
         elsif sy > 0 
            move_straight(8)
         elsif sy < 0 
            move_straight(2)
         end
         if abs_sx != 1 and abs_sy != 1
            move_random unless moving?
         end  
      end
 end
  
 #--------------------------------------------------------------------------
 # ● turn_right_45
 #--------------------------------------------------------------------------      
 def turn_right_45
     if @diagonal and @diagonal_direction != 0     
        case @diagonal_direction
          when 1;  set_direction(4) 
          when 3;  set_direction(2)
          when 7;  set_direction(8)
          when 9;  set_direction(6)  
        end
     else  
        case @direction
          when 2;  turn_lower_left
          when 4;  turn_upper_left
          when 6;  turn_lower_right
          when 8;  turn_upper_right
        end
     end  
 end

 #--------------------------------------------------------------------------
 # ● turn_left_45
 #--------------------------------------------------------------------------  
 def turn_left_45
     if @diagonal and @diagonal_direction != 0     
        case @diagonal_direction
          when 1;  set_direction(2) 
          when 3;  set_direction(6)
          when 7;  set_direction(4)
          when 9;  set_direction(8)
        end
     else  
        case @direction
          when 2;  turn_lower_right
          when 4;  turn_lower_left
          when 6;  turn_upper_right
          when 8;  turn_upper_left
        end
     end  
 end 
 
 #--------------------------------------------------------------------------
 # ● turn_right_90
 #--------------------------------------------------------------------------   
 alias diagonal_turn_right_90 turn_right_90
  def turn_right_90
      if @diagonal and @diagonal_direction != 0
         turn_diagonal_right_90
         return
      end  
      diagonal_turn_right_90
  end
  
 #--------------------------------------------------------------------------
 # ● turn_diagonal_right_90
 #--------------------------------------------------------------------------    
  def turn_diagonal_right_90
      case @diagonal_direction
         when 1;  turn_upper_left
         when 3;  turn_lower_left
         when 7;  turn_upper_right
         when 9;  turn_lower_right
      end
  end
    
 #--------------------------------------------------------------------------
 # ● turn_left_90
 #--------------------------------------------------------------------------    
  alias diagonal_turn_left_90 turn_left_90
  def turn_left_90
      if @diagonal and @diagonal_direction != 0
         turn_diagonal_left_90
         return 
      end
      diagonal_turn_left_90
  end  
    
 #--------------------------------------------------------------------------
 # ● turn_diagonal_left_90
 #--------------------------------------------------------------------------    
  def turn_diagonal_left_90
      case @diagonal_direction
         when 1;  turn_lower_right
         when 3;  turn_upper_right
         when 7;  turn_lower_left
         when 9;  turn_upper_left
      end
  end     
    
  #--------------------------------------------------------------------------
  # ● diagonal_turn_180
  #--------------------------------------------------------------------------
  alias diagonal_turn_180 turn_180
  def turn_180  
      if @diagonal and @diagonal_direction != 0
         turn_diagonal_180 
         return
      end
      diagonal_turn_180
  end
  
 #--------------------------------------------------------------------------
 # ● turn_diagonal_180 
 #--------------------------------------------------------------------------    
  def turn_diagonal_180 
      case @diagonal_direction
         when 1;  turn_upper_right
         when 3;  turn_upper_left
         when 7;  turn_lower_right
         when 9;  turn_lower_left
      end
  end  
    
 #--------------------------------------------------------------------------
 # ● turn_random
 #--------------------------------------------------------------------------    
  alias diagonal_turn_random turn_random
  def turn_random
      if @diagonal 
         turn_diagonal_random
         return 
      end  
      diagonal_turn_random 
  end  
  
 #--------------------------------------------------------------------------
 # ● turn_diagonal_random
 #--------------------------------------------------------------------------    
  def turn_diagonal_random
      case rand(8)
          when 0;  set_direction(8) 
          when 1;  set_direction(6) 
          when 2;  set_direction(4) 
          when 3;  set_direction(2) 
          when 4;  turn_lower_left  
          when 5;  turn_lower_right
          when 6;  turn_upper_left  
          when 7;  turn_upper_right
      end
  end 
 
end    

#===============================================================================
# ■ Game_Player
#===============================================================================
class Game_Player < Game_Character
  
  #--------------------------------------------------------------------------
  # ● Move By Input
  #--------------------------------------------------------------------------    
  alias diagonal_move_by_input move_by_input
  def move_by_input
      if XAS_SYSTEM::PLAYER_DIAGONAL_MOVEMENT 
         player_diagonal_move_by_input
        # update_sprite_diagonal
         update_return_direction
         return
      end
      diagonal_move_by_input
  end   
    
  #--------------------------------------------------------------------------
  # ● Update Sprite Diagonal
  #--------------------------------------------------------------------------        
  def update_sprite_diagonal
      return if @diagonal_direction == 0
      return if self.action != nil
      return if @dash_active
      make_pose("_Diagonal", 2)
  end  
  
  #--------------------------------------------------------------------------
  # ● Update Return Direction
  #--------------------------------------------------------------------------          
  def update_return_direction
      return if XAS_BA::DIAGONAL_DURATION_ENABLE == false
      return if @diagonal_time == 0
      return if moving? or @stop
      @diagonal_time -= 1
      @diagonal_direction = 0 if @diagonal_time == 0
  end
   
  #--------------------------------------------------------------------------
  # ● Player Diagonal Move By Input
  #--------------------------------------------------------------------------      
  def player_diagonal_move_by_input    
      return unless movable?
      return if $game_map.interpreter.running?
      case Input.dir8
           when 1 
               move_diagonal(4, 2)
               unless moving?
                   move_straight(4)
                   move_straight(2)                 
               end  
               @diagonal_direction = 1  
           when 2; move_straight(2)
           when 3
                move_diagonal(6, 2)
                unless moving?
                   move_straight(6)
                   move_straight(2)
                end
                @diagonal_direction = 3 
           when 4;  move_straight(4)
           when 6;  move_straight(6)
           when 7
                 move_diagonal(4, 8)
                 unless moving?
                    move_straight(4)
                    move_straight(8)
                end
                @diagonal_direction = 7
           when 8;  move_straight(8)
           when 9  
                 move_diagonal(6, 8)
                 unless moving?
                    move_straight(6)
                    move_straight(8)
                end
                @diagonal_direction = 9  
      end
  end  
  
end


#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ MOVEMENT - FORCE ACTION
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#===============================================================================
# ■ Game Character
#===============================================================================
class Game_Character < Game_CharacterBase 
  
  #--------------------------------------------------------------------------
  # ● moving 2? 
  #--------------------------------------------------------------------------  
  def moving2?
      @real_x != @x || @real_y != @y
  end   
  
  #--------------------------------------------------------------------------
  # ● Can Force Action?
  #--------------------------------------------------------------------------          
  def can_force_action?
      return false if @force_action_times  == 0
      return false if self.moving2?
      return false if self.jumping?
      return false if self.knockbacking?
      return false if self.stop
      return true
  end
    
  #--------------------------------------------------------------------------
  # ● Update Force Action
  #--------------------------------------------------------------------------        
  def update_force_action
      @force_action_times -= 1
      execute_force_action
      execute_force_action_tool_effect if @tool_id > 0 and @tool_effect != "" 
      reset_auto_action if @force_action_times == 0 
  end 
  
  #--------------------------------------------------------------------------
  # ● Execute Force Action
  #--------------------------------------------------------------------------          
  def execute_force_action  
      case @force_action
        when "Forward" 
            move_forward
        when "Backward" 
            move_backward
        when "Toward Player"   
            move_toward_player 
        when "Move Left"    
            move_straight(4)
        when "Move Right"
            move_straight(6)
        when "Move Up"    
            move_straight(8)
        when "Move Down"
            move_straight(2)
        when "All Shoot"  
              if self.action != nil
                 turn_right_45
                 self.shoot(self.action.id) unless @force_action_times == 0
              end
        when "Four Shoot"  
              if self.action != nil
                 turn_right_90
                 self.shoot(self.action.id) unless @force_action_times == 0
              end               
        when "Three Shoot"  
              if self.action != nil
                 case @force_action_times
                     when 2
                       turn_right_45
                     when 1
                       turn_left_90
                     when 0
                       turn_right_45
                 end  
                 self.shoot(self.action.id) unless @force_action_times == 0
              end       
        when "Two Shoot"  
              if self.action != nil
                 turn_180
                 self.shoot(self.action.id) unless @force_action_times == 0
              end   
        end  
  end  
  
  #--------------------------------------------------------------------------
  # ● Execute Force Action Tool Effect
  #--------------------------------------------------------------------------
  def execute_force_action_tool_effect 
      action_effect_during_move     
      action_effect_after_move if @force_action_times == 0
  end  
  
  #--------------------------------------------------------------------------
  # ● Auto Action Effect During Move
  #--------------------------------------------------------------------------            
  def reset_auto_action  
      @force_action = ""
      @force_action_times = 0
      @anime_count = 0
  end
  
  #--------------------------------------------------------------------------
  # ● Action Effect During Move
  #--------------------------------------------------------------------------          
  def action_effect_during_move  
      if @tool_effect == "Boomerang" and @force_action == "Toward Player"  
         if @x == $game_player.x and @y == $game_player.y  
            self.action.duration = 15
            @force_action_times = 0
            @force_action_type = ""            
          end 
      end
  end  

  #--------------------------------------------------------------------------
  # ● Action Effect After Move
  #--------------------------------------------------------------------------            
  def action_effect_after_move
      if @tool_effect == "Boomerang"
         @force_action_times = 30
         @force_action = "Toward Player"   
         @move_frequency = 6
         @move_speed = 5.5           
      end     
  end      
      
end  


#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ MOVEMENT - EXTRA MOVEMENT
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#===============================================================================
# ■ Game Character
#===============================================================================
class Game_Character < Game_CharacterBase
  
  #--------------------------------------------------------------------------
  # ● Check XY
  #--------------------------------------------------------------------------      
  def check_xy
      @pre_x = @x
      @pre_y = @y
  end    
 
  #--------------------------------------------------------------------------
  # ● Turn Reverse
  #--------------------------------------------------------------------------          
  def turn_reverse(dir)
      case dir     
        when 2; set_direction(8)
        when 4; set_direction(6)
        when 6; set_direction(4)
        when 8; set_direction(2)
      end    
  end
  
  #--------------------------------------------------------------------------
  # ● Org Here
  #--------------------------------------------------------------------------        
  def org_here
      @orig_pos_x = @x
      @orig_pos_y = @y
  end  
  
  #--------------------------------------------------------------------------
  # ● return_org
  #--------------------------------------------------------------------------          
  def return_org(type = 0)
      if type == 1
         moveto(@orig_pos_x,@orig_pos_x) 
      else  
         jump(0,0)
      end
      @x = @orig_pos_x
      @y = @orig_pos_y
  end  
  
  #--------------------------------------------------------------------------
  # ● Dual Switch
  #--------------------------------------------------------------------------    
  def dual_switch(switch_on, switch_off,percentage = 100)
      enable_per = rand(100)
      if enable_per <= percentage 
         $game_switches[switch_on] = true    
         $game_switches[switch_off] = false
         $game_map.need_refresh = true
      end   
  end   
  
  #--------------------------------------------------------------------------
  # ● Move Forward 2
  #--------------------------------------------------------------------------  
  def move_forward2
      return if moving2?
      move_forward
  end  
  
  #--------------------------------------------------------------------------
  # ● Bounce Direction
  #--------------------------------------------------------------------------  
  def bounce_direction
      @diagonal = true
      turn_random  
  end
  
  #--------------------------------------------------------------------------
  # ● Turn_back
  #--------------------------------------------------------------------------            
  def turn_back
      if @diagonal_direction != 0
         case @diagonal_direction
              when 1
                turn_upper_right
              when 3
                turn_upper_left
              when 7
                turn_lower_right 
              when 9         
                turn_lower_left
         end
      else
          case @direction
               when 2;   set_direction(8) 
               when 4;   @direction = 6#move_straight(6)#set_direction(6) 
               when 6;   set_direction(4) 
               when 8;   set_direction(2) 
          end
      end     
  end  
  
  #--------------------------------------------------------------------------
  # ● Jump_high
  #--------------------------------------------------------------------------
  def jump_high(x_plus,y_plus,high = 10)    
      @x += x_plus
      @y += y_plus
      distance = Math.sqrt(x_plus * x_plus + y_plus * y_plus).round
      @jump_peak = high + distance - @move_speed
      @jump_count = @jump_peak * 2
      @stop_count = 0
      straighten
  end
  
  #--------------------------------------------------------------------------
  # ● Passable Temp
  #--------------------------------------------------------------------------    
 def passable_temp_id?(x, y)
     return false unless $game_map.valid?(x, y)    
     return true if @through or debug_through?     
     return false unless map_passable?(x, y,@direction)         
     return false if collide_with_characters_temp_id?(x, y) 
     return true                                   
  end
  
  #--------------------------------------------------------------------------
  # ● Collide With Characters
  #--------------------------------------------------------------------------      
  def collide_with_characters_temp_id?(x, y)
      for event in $game_map.events_xy(x, y)         
          unless event.through or event.battler != nil    
             return true if self.is_a?(Game_Event)       
             return true if event.priority_type >= 1     
          end
      end
      return false
  end  

  #--------------------------------------------------------------------------
  # ● Force Move Route
  #--------------------------------------------------------------------------
  alias x_force_move_route force_move_route
  def force_move_route(move_route)
      if self.battler != nil and self.is_a?(Game_Event)
         return
      end  
      x_force_move_route(move_route)
  end  
end  


#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ MOVEMENT - PLAYER COMMANDS
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#==============================================================================
# ■ Game_Player 
#==============================================================================
class Game_Player < Game_Character
  include XAS_BUTTON
  
  #--------------------------------------------------------------------------
  # ● Update Action Command
  #--------------------------------------------------------------------------  
  def update_action_command
      update_check_battler_equipment if can_check_battler_equipment?
      update_dash_button
      update_auto_target_shoot
      update_combo_time
      update_action_1_button
      update_action_2_button
      update_skill_button
      update_item_button
      update_change_leader_button
      update_charge_button
  end  

  #--------------------------------------------------------------------------
  # ● Can Use Command?
  #--------------------------------------------------------------------------      
  def can_use_command?
      return false if $game_map.interpreter.running?
      return false if $game_message.visible
      return false if self.battler == nil
      return false if self.action != nil
      return false if self.knockbacking?      
      return false if @stop
      return true
  end    
  
  #--------------------------------------------------------------------------
  # ● Update Check Battler Equipment
  #--------------------------------------------------------------------------      
  def update_check_battler_equipment
  
  end  
  
  #--------------------------------------------------------------------------
  # ● Can Check Battler Equipment
  #--------------------------------------------------------------------------        
  def can_check_battler_equipment?
      if self.battler.old_equipment_id[0] != self.battler.equips[0] or
         self.battler.old_equipment_id[1] != self.battler.equips[1] or
         self.battler.old_equipment_id[2] != self.battler.equips[2] or
         self.battler.old_equipment_id[3] != self.battler.equips[3] or
         self.battler.old_equipment_id[4] != self.battler.equips[4]
         self.battler.old_equipment_id[0] = self.battler.equips[0]
         self.battler.old_equipment_id[1] = self.battler.equips[1]
         self.battler.old_equipment_id[2] = self.battler.equips[2]
         self.battler.old_equipment_id[3] = self.battler.equips[3]
         self.battler.old_equipment_id[4] = self.battler.equips[4]      
         return true
      end   
      return false
  end
  
  #--------------------------------------------------------------------------
  # ● Update Charge Button
  #--------------------------------------------------------------------------    
  def update_charge_button
      return unless can_charge_command?
      if Input.press?(ACTION_1_BUTTON) and ENABLE_ACTION_1_BUTTON
         update_charge_effect(0)
         reset_charge_temp if Input.press?(ACTION_2_BUTTON) and ENABLE_ACTION_2_BUTTON
      elsif Input.press?(ACTION_2_BUTTON) 
         update_charge_effect(1)
         reset_charge_temp if Input.press?(ACTION_1_BUTTON)
      else
         if self.battler.x_charge_action[2] >= self.battler.x_charge_action[1]
            self.shoot(self.battler.x_charge_action[0])
         end
        reset_charge_temp
      end  
  end

  #--------------------------------------------------------------------------
  # ● Update Charge Effect
  #--------------------------------------------------------------------------        
  def update_charge_effect(type)
      if self.battler.x_charge_action[2] == 0
         return unless equipped_charge_action?(type)
      end  
      if self.battler.x_charge_action[2] < self.battler.x_charge_action[1] 
         self.battler.x_charge_action[2] += 1 
      end
      self.battler.x_charge_action[3] += 1
      if self.battler.x_charge_action[3] > XAS_ANIMATION::LOOP_ANIMATIONS_SPEED
         self.battler.x_charge_action[3] = 0
         if self.battler.x_charge_action[2] < self.battler.x_charge_action[1]
            self.animation_id = XAS_ANIMATION::CHARGE_ANIMATION1_ID
         else
            self.animation_id = XAS_ANIMATION::CHARGE_ANIMATION2_ID
         end  
      end
  end
  
  #--------------------------------------------------------------------------
  # ● Equipped Charge Action
  #--------------------------------------------------------------------------          
  def equipped_charge_action?(type)
      case type
         when 0
           weapon = self.battler.equips[0]
         when 1
           weapon = self.battler.equips[1] 
      end
      if weapon == nil
         return false 
         reset_charge_temp
      end
      if weapon.note =~ /<Charge Action = (\d+) - (\d+)>/   
         self.battler.x_charge_action[0] = $1.to_i rescue 0#Skill ID
         self.battler.x_charge_action[1] = $2.to_i rescue 0#Max Time
         self.battler.x_charge_action[2] = 0#Current Time
         self.battler.x_charge_action[3] = 0#Loop Anime Time
         return true
      end            
      return false    
      reset_charge_temp
  end
  
  #--------------------------------------------------------------------------
  # ● Update Combo Time
  #--------------------------------------------------------------------------        
  def update_combo_time
      return if self.battler.x_combo[2] == 0
      self.battler.x_combo[2] -= 1
      if self.battler.x_combo[2] == 0
         self.battler.x_combo[0] = 0
         self.battler.x_combo[1] = -1
      end   
  end  
  
  #--------------------------------------------------------------------------
  # ● Can Use Weapon Command?
  #--------------------------------------------------------------------------    
  def can_use_weapon_command?
      return false if $game_system.command_enable == false
      return false unless ENABLE_ACTION_1_BUTTON
      return false if self.battler.shield
      return false if self.battler.cast_action[4] > 0
      return false if self.battler.x_charge_action[2] > 0
      return true
  end
  
  #--------------------------------------------------------------------------
  # ● Can Use Shield Command?
  #--------------------------------------------------------------------------      
  def can_use_shield_command?
      return false if $game_system.command_enable == false
      return false unless ENABLE_ACTION_2_BUTTON
      return false if self.battler.equips[1] == nil
      return false if self.battler.equips[1].id == 0
      return false if self.battler.cast_action[4] > 0
      return false if self.battler.x_charge_action[2] > 0
      return true
  end
  
  #--------------------------------------------------------------------------
  # ● Can Use Skill Command?
  #--------------------------------------------------------------------------    
  def can_use_skill_command? 
      return false if $game_system.command_enable == false
      return false unless ENABLE_SKILL_BUTTON
      return false if self.battler.shield
      return false if self.battler.cast_action[4] > 0
      return false if self.battler.x_charge_action[2] > 0
      return true
  end    
  
  #--------------------------------------------------------------------------
  # ● Can Use Item Command?
  #--------------------------------------------------------------------------    
  def can_use_item_command?
      return false if $game_system.command_enable == false
      return false unless ENABLE_ITEM_BUTTON
      return false if self.battler.shield    
      return false if self.battler.cast_action[4] > 0
      return false if self.battler.x_charge_action[2] > 0
      return true
  end      
  
  #--------------------------------------------------------------------------
  # ● Can Charge Command
  #--------------------------------------------------------------------------      
  def can_charge_command?
      return false if $game_system.command_enable == false
      return false if self.battler.cast_action[4] > 0
      return false if self.battler.shield      
      return true
  end   
  
  #--------------------------------------------------------------------------
  # ● Can Use Change Leader Command?
  #--------------------------------------------------------------------------      
  def can_use_change_leader_command?
      return false unless ENABLE_CHANGE_LEADER_BUTTON
      return false if self.battler.shield    
      return false if self.battler.cast_action[4] > 0
      return false if self.battler.x_charge_action[2] > 0
      return false if $game_temp.change_leader_wait_time > 0
      return true
  end
  
  #--------------------------------------------------------------------------
  # ● State_Seal Command
  #--------------------------------------------------------------------------        
  def state_seal_command?(type)
      seal = false
      case type  
         when 0
            seal = true if self.battler.state_mute
            seal = true if self.battler.state_seal_attack
         when 1
            seal = true if self.battler.state_mute
            seal = true if self.battler.state_seal_attack
         when 2
            seal = true if self.battler.state_mute
            seal = true if self.battler.state_seal_skill
         when 3  
            seal = true if self.battler.state_mute   
            seal = true if self.battler.state_seal_item
      end
      if seal
         seal_effect 
         return true
      end  
      return false      
  end  
  
  #--------------------------------------------------------------------------
  # ● Check Equipped Action
  #--------------------------------------------------------------------------    
  def check_equipped_action(command_type)
      case command_type
         when 0 # Weapon 1
            weapon = self.battler.equips[0]
            if weapon == nil 
               self.battler.x_action1_id = 0
               return 
            end
            weapon.note =~ /<Action ID = (\d+)>/   
            action_id =  $1.to_i
            action_id = 0 if action_id == nil 
            self.battler.x_action1_id = action_id
         when 1 # Weapon 2
            weapon = self.battler.equips[1]
            if weapon == nil 
               self.battler.x_action2_id = 0
               return 
            end   
            weapon.note =~ /<Action ID = (\d+)>/
            action_id =  $1.to_i
            action_id = 0 if action_id == nil             
            self.battler.x_action2_id = action_id
         when 2 # Skill   
            
         when 3 # Item 
            item_id = $data_items[self.battler.item_id]
            if item_id == nil             
               self.battler.x_item_id =  0
               return
            end   
            item_id.note =~ /<Action ID = (\d+)>/
            action_id =  $1.to_i
            action_id = 0 if action_id == nil     
            self.battler.x_item_id = action_id
      end     
  end
    
  #--------------------------------------------------------------------------
  # ● Execute Combo
  #--------------------------------------------------------------------------        
  def execute_combo?(type)  
      if type == self.battler.x_combo[1] and self.battler.x_combo[0] != 0
         return if state_seal_command?(type)        
         self.shoot(self.battler.x_combo[0])
         self.battler.x_combo[1] = type 
         return true
      end  
      self.battler.x_combo[0] = 0
      self.battler.x_combo[1] = type
      self.battler.x_combo[2] = 0
      return false
  end
  
  #--------------------------------------------------------------------------
  # ● Update Change Leader Button
  #--------------------------------------------------------------------------        
  def update_change_leader_button
      if Input.trigger?(CHANGE_LEADER_BUTTON)
         return unless can_use_change_leader_command?
         change_leader     
      end 
  end
  
  #--------------------------------------------------------------------------
  # ● Update Action 1 Button
  #--------------------------------------------------------------------------      
  def update_action_1_button
      if Input.trigger?(ACTION_1_BUTTON)
         type = 0
         return unless can_use_weapon_command?
         return if execute_combo?(type)
         check_equipped_action(type)
         action_id = self.battler.x_action1_id
         return if action_id == 0 
         return if state_seal_command?(type)
         self.shoot(action_id)
      end    
  end
    
  #--------------------------------------------------------------------------
  # ● Update Action 2 Button
  #--------------------------------------------------------------------------    
  def update_action_2_button
      if Input.trigger?(ACTION_2_BUTTON)
         if self.battler.equips[1].is_a?(RPG::Weapon)
            type = 1 
            return unless can_use_weapon_command?
            return if execute_combo?(type)
            check_equipped_action(type)
            action_id = self.battler.x_action2_id
            return if action_id == 0 
            return if state_seal_command?(type)            
            self.shoot(action_id)
            return
         end   
      end         
      update_shield_button
  end
  
  #--------------------------------------------------------------------------
  # ● Update Shield Button
  #--------------------------------------------------------------------------        
  def update_shield_button
      if Input.press?(ACTION_2_BUTTON) 
         if can_use_shield_command? 
            unless self.battler.shield  
                shield = self.battler.equips[1]
                if shield.note =~ /<Action>/
                   if shield.note =~ /<Pose = (\w+)>/
                      make_pose($1.to_s, 2) 
                   end
                else   
                   self.battler.shield = false
                   return
                end
            end 
            self.x_pose_duration = 2
            self.battler.shield = true 
            update_shield_diretion_button
         else
            self.battler.shield = false
         end  
      else   
         self.battler.shield = false
      end       
  end
  
  #--------------------------------------------------------------------------
  # ● update_shield_direction_button
  #--------------------------------------------------------------------------          
  def update_shield_diretion_button 
      return if @direction_fix
      case Input.dir4
         when 2;  set_direction(2)   
         when 4;  set_direction(4)   
         when 6;  set_direction(6)   
         when 8;  set_direction(8)   
      end
  end
  
  #--------------------------------------------------------------------------
  # ● Update Skill Button
  #--------------------------------------------------------------------------      
  def update_skill_button
      if Input.trigger?(SKILL_BUTTON)
         type = 2
         return unless can_use_skill_command?
         return if execute_combo?(type)
         check_equipped_action(type)
         action_id = self.battler.skill_id
         return if action_id == 0 
         return if state_seal_command?(type)         
         self.shoot(action_id)
      end    
  end
  
  #--------------------------------------------------------------------------
  # ● Update Item Button
  #--------------------------------------------------------------------------      
  def update_item_button
      if Input.trigger?(ITEM_BUTTON)
         type = 3         
         return unless can_use_item_command?
         return if execute_combo?(type)
         check_equipped_action(type)
         action_id = self.battler.x_item_id
         return if action_id == 0 
         return if state_seal_command?(type)         
         self.shoot(action_id)
      end   
  end
  
  #--------------------------------------------------------------------------
  # ● Update Auto Target Shoot
  #-------------------------------------------------------------------------- 
  def update_auto_target_shoot
      return if $game_temp.xas_target_time == 0
      return if $game_temp.xas_target_shoot_id == 0
      return if $game_temp.xas_target_x == 0 and $game_temp.xas_target_y == 0   
      $game_temp.xas_target_time -= 1
      if $game_temp.xas_target_time == 0
         self.shoot($game_temp.xas_target_shoot_id) 
         $game_temp.xas_target_shoot_id = 0
      end   
  end   
  
 #--------------------------------------------------------------------------
 # ● Dash?
 #--------------------------------------------------------------------------            
 alias x_dash dash?
 def dash?   
     return false if XAS_SYSTEM::DASH_SYSTEM 
     x_dash
 end 

 #--------------------------------------------------------------------------
 # ● Can Dash?
 #--------------------------------------------------------------------------              
 def can_dash?
     return false unless XAS_BUTTON::ENABLE_DASH_BUTTON
     return false if self.battler.shield
     return true if Input.press?(XAS_BUTTON::DASH_BUTTON) 
     @dash_active = false
     return false
 end
 
 #--------------------------------------------------------------------------
 # ● Update Dash Command
 #--------------------------------------------------------------------------             
 def update_dash_button
     return unless can_dash?
     @dash_active = true
     @anime_count -= 0.5 if moving? 
     update_dash_sprite_name
 end  
 
 #--------------------------------------------------------------------------
 # ● Update Dash Sprite Name
 #--------------------------------------------------------------------------              
 def update_dash_sprite_name
     make_pose("_Dash", 2) 
 end
 
end 


#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ TOOL - INITIALIZE
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#===============================================================================
# ■ Game_Map
#===============================================================================
class Game_Map
  
  attr_accessor :need_refresh_token

  #--------------------------------------------------------------------------
  # ● need_add_tokens 
  #--------------------------------------------------------------------------  
  def need_add_tokens
      @need_add_tokens = [] if @need_add_tokens == nil
      return @need_add_tokens
  end
  
  #--------------------------------------------------------------------------
  # ● need_remove_tokens 
  #--------------------------------------------------------------------------
  def need_remove_tokens
      @need_remove_tokens = [] if @need_remove_tokens == nil
      return @need_remove_tokens
  end
  
  #--------------------------------------------------------------------------
  # ● add_token 
  #--------------------------------------------------------------------------
  def add_token(token_event)
      $game_temp.tool_event = [] if $game_temp.tool_event == nil
      $game_temp.tool_event.push(token_event)
      self.need_add_tokens.push(token_event)
      self.need_refresh_token = true
  end
  
  #--------------------------------------------------------------------------
  # ● remove_token
  #--------------------------------------------------------------------------
  def remove_token(token_event)
      @events.delete(token_event.id)
      self.need_remove_tokens.push(token_event)
      self.need_refresh_token = true
  end
 
  #--------------------------------------------------------------------------
  # ● clear_tokens 
  #--------------------------------------------------------------------------
  def clear_tokens
      $game_system.tools_on_map.clear
      $game_system.tools_on_map = []
      for event in @events.values.dup
          remove_token(event) if event.is_a?(Token_Event)
      end
      channels = ["A", "B", "C", "D"]
      for id in 1001..(token_id_shift - 1)
          for a in channels
              key = [self.map_id, id, a]
              $game_self_switches.delete(key)
          end
      end
      clear_token_id
  end
    
  #--------------------------------------------------------------------------
  # ● Update
  #--------------------------------------------------------------------------      
  alias x_temp_tool_hash_update update
  def update(main = false)
      x_temp_tool_hash_update(main)
      update_add_tool_hash
  end

  #--------------------------------------------------------------------------
  # ● Update Add Toll Hash
  #--------------------------------------------------------------------------      
  def update_add_tool_hash  
      return if $game_temp.tool_event == nil
      for i in $game_temp.tool_event
          $game_map.events[i.id] = i
          execute_tool_effects_hash(i)
      end  
      $game_temp.tool_event.clear
      $game_temp.tool_event = nil
  end
    
  #--------------------------------------------------------------------------
  # ● Execute Toll Effects Hash
  #--------------------------------------------------------------------------        
  def execute_tool_effects_hash(i)
      
  end  
end

#===============================================================================
# ■ Game_SelfSwitches  
#===============================================================================
class Game_SelfSwitches
  def delete(key)
      @data.delete(key)
  end
end

#===============================================================================
# ■ Game_Map  
#===============================================================================
class Game_Map
    
  attr_accessor :token_id
  
  #--------------------------------------------------------------------------
  # ● token_id_shift 
  #--------------------------------------------------------------------------  
  def token_id_shift
      @token_id  = 1000 if @token_id == nil
      @token_id += 1
      return @token_id
  end

  #--------------------------------------------------------------------------
  # ● clear_token_id 
  #--------------------------------------------------------------------------  
  def clear_token_id
      @token_id = nil
  end
end

#===============================================================================
# ■ XRXS_CTS_RefreshToken 
#===============================================================================
module XRXS_CTS_RefreshToken
  
  #--------------------------------------------------------------------------
  # ● refresh_token
  #--------------------------------------------------------------------------  
  def refresh_token
      for event in $game_map.need_add_tokens
          @character_sprites.push(Sprite_Character.new(@viewport1, event))
      end
      $game_map.need_add_tokens.clear
      for sprite in @character_sprites.dup
          if $game_map.need_remove_tokens.empty?
             break
          end
          if $game_map.need_remove_tokens.delete(sprite.character)
             @character_sprites.delete(sprite)
             sprite.dispose
          end
      end
      $game_map.need_refresh_token = false
  end
end

#===============================================================================
# ■  Spriteset_Map
#===============================================================================
class Spriteset_Map
  include XRXS_CTS_RefreshToken
  
  #--------------------------------------------------------------------------
  # ● Initialize
  #--------------------------------------------------------------------------    
  alias x_smap_initialize initialize
  def initialize
      setup_start
      x_smap_initialize
  end
  
  #--------------------------------------------------------------------------
  # ● Setup Start
  #--------------------------------------------------------------------------      
  def setup_start
      $game_player.reset_old_level(true)
  end
  
end

#===============================================================================
# ■ Game_Player
#===============================================================================
class Game_Player < Game_Character

  #--------------------------------------------------------------------------
  # ● x_reserve_transfer
  #--------------------------------------------------------------------------     
  alias x_reserve_transfer reserve_transfer 
  def reserve_transfer(map_id, x, y, direction)
      $game_map.clear_tokens
      if $game_temp.tool_event != nil 
         $game_temp.tool_event.clear
         $game_temp.tool_event = nil
      end   
      x_reserve_transfer(map_id, x, y, direction)
  end
  
end

#===============================================================================
# ■ Token_Event
#===============================================================================
class Token_Event < Game_Event
  
  #--------------------------------------------------------------------------
  # ● Token_Event
  #--------------------------------------------------------------------------
  def initialize(map_id, event)
      event.id = $game_map.token_id_shift
      super
  end
  
  #--------------------------------------------------------------------------
  # ● erase
  #--------------------------------------------------------------------------
  def erase
      super
      $game_map.remove_token(self)
  end
end


#===============================================================================
# ■  XRXS_ActionTemplate
#===============================================================================
module XRXS_ActionTemplate
  map_id = XAS_SYSTEM::ACTION_TEMPLATE_MAP_ID
  map = load_data(sprintf("Data/Map%03d.rvdata2", map_id))
  @@events = map.events
end

#===============================================================================
# ■  Token_Event
#===============================================================================
class Token_Event < Game_Event
  include XRXS_ActionTemplate
end

#===============================================================================
# ■  Game_Temp
#===============================================================================
class Game_Temp
  attr_accessor :active_token
end



#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ TOOL - SHOOT COMMAND
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#===============================================================================
# ■ XAS ACTION
#===============================================================================
module XAS_ACTION
  attr_reader   :action
  attr_reader   :erased
  
  #--------------------------------------------------------------------------
  # ● shoot
  #--------------------------------------------------------------------------
  def shoot(action_id = 0)
      return if action_id == 0 
      skill = $data_skills[action_id]
      return unless can_shoot?(skill)
      execute_user_effects(skill)
      execute_call_event(action_id)      
      self.action_attachment(action_id)
      execute_set_pose(action_id)
  end

  #--------------------------------------------------------------------------
  # ● Can Shoot
  #--------------------------------------------------------------------------    
  def can_shoot?(skill)
      if self.battler == nil and self.tool_id > 0
         @battler = self.action.user.battler
      end  
      return false if self.battler == nil
      return false if skill == nil
      return true if ignore_can_shoot?(skill)
      enough_cost = true
      return false if tools_on_map?(skill.id)      
      if self.battler.state_mute  
         seal_effect 
         return false
      end   
      if self.battler.cast_action[4].between?(1,self.battler.cast_action[1] -1)
         return false 
      end
      return false if check_cast_action?(skill)
      return false if check_auto_target_select?(skill)
      unless enough_skill_cost?(skill)
         Audio.se_play("Audio/SE/" + XAS_SOUND::ACTION_COST , 100, 100) 
         return false 
      end
      return true
  end 
  
  #--------------------------------------------------------------------------
  # ● Ignore Can Shoot?     
  #--------------------------------------------------------------------------                
  def ignore_can_shoot?(skill)
      return false
  end
  
  #--------------------------------------------------------------------------
  # ● Tools on Map
  #--------------------------------------------------------------------------              
  def tools_on_map?(skill_id)
      return true if $game_system.tools_on_map.include?(skill_id)
      return false
  end  
  
  #--------------------------------------------------------------------------
  # ● Check Cast Action
  #--------------------------------------------------------------------------            
  def check_cast_action?(skill)
      if self.battler.cast_action[0] != 0
         self.battler.cast_action[0] = 0
         self.battler.cast_action[1] = 0
         self.battler.cast_action[2] = 0
         self.battler.cast_action[3] = 0
         self.battler.cast_action[4] = 0
         return false
      end  
      if skill.note =~ /<Cast Time = (\d+)>/ and
         $game_temp.xas_target_shoot_id == 0 and
         self.force_action_times == 0
         self.battler.cast_action[0] = skill.id
         self.battler.cast_action[1] = $1.to_i rescue 0
         self.battler.cast_action[2] = XAS_ANIMATION::CAST_TIME_ANIMATION_ID
         self.battler.cast_action[3] = 0
         self.battler.cast_action[4] = 0
         self.animation_id = self.battler.cast_action[2]
         return true
      end      
      return false
  end
  
  #--------------------------------------------------------------------------
  # ● Check Auto Target Select
  #--------------------------------------------------------------------------          
  def check_auto_target_select?(skill)
      return false if self.is_a?(Game_Event)
      if skill.note =~ /<Auto Target>/
         if $game_temp.xas_target_shoot_id == 0
            $game_temp.xas_target_shoot_id = skill.id
            $game_map.check_events_on_screen
            SceneManager.call(Scene_Target_Select)
            return true 
         end          
      end  
      return false
  end
  
  #--------------------------------------------------------------------------
  # ● enough_skill_cost?
  #--------------------------------------------------------------------------          
  def enough_skill_cost?(skill)
      return false unless enough_mp_cost?(skill)         
      return false unless enough_item_cost?(skill)      
      return true
  end
    
  #--------------------------------------------------------------------------
  # ● Enough MP Cost
  #--------------------------------------------------------------------------        
  def enough_mp_cost?(skill)  
      if @force_action_times > 0
         return true if @force_action == "All Shoot" 
         return true if @force_action == "Four Shoot"  
         return true if @force_action == "Three Shoot" 
         return true if @force_action == "Two Shoot" 
      end
      if self.battler.mp < skill.mp_cost 
         self.battler.damage = XAS_WORD::NO_MP
         self.battler.damage_pop = true
         return false
      else   
         self.battler.mp -= skill.mp_cost
         return true
      end
      return true 
  end  
  
  #--------------------------------------------------------------------------
  # ● Enough MP Cost
  #--------------------------------------------------------------------------      
  def enough_item_cost?(skill)
      return true if self.battler.is_a?(Game_Enemy)
      if @force_action_times > 0
         return true if @force_action == "All Shoot"
         return true if @force_action == "Four Shoot"
         return true if @force_action == "Three Shoot"
         return true if @force_action == "Two Shoot" 
      end      
      skill.note =~ /<Item Cost = (\d+)>/
      item_id = $1.to_i 
      if item_id != nil and item_id != 0
         item_cost = $data_items[item_id]
         number = $game_party.item_number(item_cost)
         if number == 0 or number == nil
            self.battler.damage = XAS_WORD::NO_ITEM
            self.battler.damage_pop = true
            return false 
         else
            $game_party.lose_item(item_cost, 1, false)
            return true
         end            
      end    
      return true 
  end    
  
  #--------------------------------------------------------------------------
  # ● Execute User Effects
  #--------------------------------------------------------------------------  
  def execute_user_effects(skill)
      self.battler.shield = false
      #Animation
      if skill.note =~ /<Cast Ani = (\d+)>/
         ani_id = $1.to_i     
         if ani_id != nil
            self.animation_id = ani_id
         end   
      end
      unless @force_action_times > 0
          #All Directions
          if skill.note =~ /<All Directions>/
             @force_action = "All Shoot" 
             @force_action_times = 8        
          elsif skill.note =~ /<Four Directions>/
             @force_action = "Four Shoot" 
             @force_action_times = 4       
          elsif skill.note =~ /<Three Directions>/
             @force_action = "Three Shoot" 
             @force_action_times = 3        
          elsif skill.note =~ /<Two Directions>/
             @force_action = "Two Shoot" 
             @force_action_times = 2         
          end  
      end  
  end
    
  #--------------------------------------------------------------------------
  # ● Execute Set Pose
  #--------------------------------------------------------------------------      
  def execute_set_pose(action_id)
      @action.duration = @action.sunflag 
      make_pose(@action.self_motion, @action.sunflag ) 
      @pattern = 0
      @pattern_count  = 0
      @step_anime = true
      @self_motion = nil      
      self.need_refresh = true if self.is_a?(Game_Player)
  end  
    
  #--------------------------------------------------------------------------
  # ● execute_call_event
  #--------------------------------------------------------------------------  
  def execute_call_event(action_id)
      bullet_token = Token_Bullet.new(self, action_id)
      $game_map.add_token(bullet_token)
      return bullet_token
  end
      
  #--------------------------------------------------------------------------
  # ● action_attachment
  #--------------------------------------------------------------------------
  def action_attachment(action_id)
      @action = Game_Action_XAS.new(self, action_id)
      @action.attachment(action_id)
  end
  
end  


#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ TOOL - SHOOT SETTING
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#===============================================================================
# ■ Game_Action_XAS
#===============================================================================
class Game_Action_XAS
  
  attr_accessor   :user
  attr_accessor   :id                    
  attr_accessor   :attack_id            
  attr_accessor   :attack_range
  attr_accessor   :attack_range_type
  attr_accessor   :hit_events
  attr_accessor   :now_count
  attr_accessor   :pre_now_count
  attr_accessor   :duration
  attr_accessor   :blow_power
  attr_accessor   :piercing
  attr_accessor   :ignore_knockback_invincible
  attr_accessor   :target_invunerable_duration
  attr_accessor   :multi_hit
  attr_accessor   :ally_damage
  attr_accessor   :all_damage
  attr_accessor   :sunflag
  attr_accessor   :self_motion
  attr_accessor   :second_animation_id
  attr_accessor   :third_animation_id
  attr_accessor   :attack_range_type
  attr_accessor   :attack_range_plan
  attr_accessor   :blow_power
  attr_accessor   :ignore_guard
  attr_accessor   :user_invincible  
  attr_accessor   :short_range
  attr_accessor   :first_impact_time
  attr_accessor   :animation_time
  attr_accessor   :duration 
  attr_accessor   :item_cost
  attr_accessor   :hit_shake
  attr_accessor   :hit_hold_target
  attr_accessor   :hit_bounce
  attr_accessor   :sticky
  attr_accessor   :reflectable
  attr_accessor   :can_reflect
  attr_accessor   :attack_id_plan
  attr_accessor   :hit_action
  attr_accessor   :fake_id
  attr_accessor   :impact
  
  #--------------------------------------------------------------------------
  # ● initialize
  #--------------------------------------------------------------------------
  def initialize(user, action_id)
      @user        = user
      @id          = action_id
      @now_count   = 0
      @duration    = nil
      @attack_id   = 0
      @attack_range = 0
      @hit_events  = []
      @blow_power  = 0
      @skill = $data_skills[action_id]
      @ignore_knockback_invincible = false
      @multi_hit = false
      @piercing = false
      @all_damage = false
      @ally_damage = false
      @ignore_guard = false
      @sunflag = 10
      @duration = 10
      @self_motion = ""
      @attack_range_type = 1
      @attack_range_plan = 1
      @blow_power = 1
      @first_impact_time  = 0
      @animation_time = []
      @target_invunerable_duration = 10
      @second_animation_id = 0
      @third_animation_id = 0 
      @user_invincible = false
      @short_range = false
      @item_cost = 0
      @hit_shake = false
      @hit_hold_target = false
      @hit_bounce = false
      @sticky = false
      @reflectable = false
      @can_reflect = false
      @hit_action = 0
      @fake_id = false
      @impact = true
  end
  
  #--------------------------------------------------------------------------
  # ● attachment 
  #--------------------------------------------------------------------------
  def attachment(action_id)
      @attack_id_plan = [action_id]
      if @skill.note =~ /<Sunflag = (\d+)>/
         @sunflag = $1.to_i
      end
      if @skill.note =~ /<Duration = (\d+)>/   
         @duration = $1.to_i
      end
      if @skill.note =~ /<Pose = (\S+)>/   
         @self_motion = $1.to_s
      end
      if @skill.note =~ /<Area = (\w+)>/ 
         case $1
            when "CROSS"   
               area = 7
            when "WALL" 
               area = 6        
            when "FRONTRHOMBUS"  
               area = 5
            when "FRONTSQUARE"
               area = 4
            when "LINE"
               area = 3
            when "SQUARE"
               area = 2               
            else   
               area = 1 
         end     
         @attack_range_type = area
       end
      if @skill.note =~ /<Range = (\d+)>/   
         @attack_range_plan = [$1.to_i]
      end
      if @skill.note =~ /<Blow Power = (\d+)>/  
         @blow_power = $1.to_i
      end   
      if @skill.note =~ /<Impact Time  = (\d+)>/   
         @first_impact_time = $1.to_i

       end   
      if @skill.note =~ /<Animation Time  = (\d+) - (\d+)>/   
         @animation_time[0] = $1.to_i
         @animation_time[1] = $2.to_i
      end
      if @skill.note =~ /<Target Invunerable = (\d+)>/
         @target_invunerable_duration = $1.to_i
      end  
      if @skill.note =~ /<Tool Hit Ani = (\d+)>/       
         @second_animation_id = $1.to_i
      end         
      if @skill.note =~ /<User Hit Ani = (\d+)>/       
         @third_animation_id = $1.to_i
      end   
      if @skill.note =~ /<Item Cost = (\d+)>/    
         @item_cost = $1.to_i
      end         
      if @skill.note =~ /<Link Action ID = (\d+)>/    
         if user.battler != nil
            user.battler.x_combo[0] = $1.to_i
            user.battler.x_combo[2] = @sunflag + 20
         end
      else     
         if user.battler != nil
            user.battler.x_combo[0] = 0
            user.battler.x_combo[1] = 0
            user.battler.x_combo[2] = 0
         end            
      end   
      if @skill.note =~ /<Hit Action ID = (\d+)>/
         @hit_action = $1.to_i
      end
      if @skill.note =~ /<Ignore Knockback>/
         @ignore_knockback_invincible = true
      end       
      if @skill.note =~ /<Multi Hit>/
         @multi_hit = true  
      end         
      if @skill.note =~ /<Piercing>/
         @piercing = true 
      end
      if @skill.note =~ /<All Damage>/
         @all_damage = true 
      end
      if @skill.note =~ /<Ally Damage>/
         @ally_damage = true 
      end       
      if @skill.note =~ /<User Invincible>/
         @user_invincible = true
      end       
      if @skill.note =~ /<Ignore Guard>/
         @ignore_guard = true
      end       
      if @skill.note =~ /<One Action>/
         unless $game_system.tools_on_map.include?(action_id)   
                $game_system.tools_on_map.push(action_id)
         end
      end       
      if @skill.note =~ /<Shake>/
         @hit_shake = true
      end
      if @skill.note =~ /<User Range>/
         @short_range = true
      end      
      if @skill.note =~ /<Hit Hold Target>/
         @hit_hold_target = true
      end        
      if @skill.note =~ /<Hit Sticky Target>/
         @sticky = true
      end        
      if @skill.note =~ /<Hit Bounce Direction>/
         @hit_bounce = true
      end   
      if @skill.note =~ /<Reflectable>/
         @reflectable = true
      end        
      if @skill.note =~ /<Can Reflect>/
         @can_reflect = true
      end  
      if @skill.note =~ /<Disable Hit>/
         @impact = false
      end
      @sunflag = 1 if @sunflag <= 0 
  end
  
  #--------------------------------------------------------------------------
  # ● update
  #--------------------------------------------------------------------------
  def update
      @first_impact_time -= 1 if @first_impact_time > 0
      if @attack_id_plan != nil
         id = @attack_id_plan[@now_count]
         unless id.nil? 
           @attack_id = id
           @hit_events.clear
           @hit_events.push(self.user) unless @all_damage or @ally_damage
         end
      end
      if @attack_range_plan != nil
         range = @attack_range_plan[@now_count]
         @attack_range = range unless range.nil?
      end
      @now_count += 1
  end  
  
  #--------------------------------------------------------------------------
  # ● done? 
  #--------------------------------------------------------------------------
  def done?
      return (self.duration.to_i > 0 and self.now_count >= self.duration)
  end
end

#===============================================================================
# ■ Token_Bullet  
#===============================================================================
class Token_Bullet < Token_Event
include XRXS_ActionTemplate
  #--------------------------------------------------------------------------
  # ● initialize 
  #--------------------------------------------------------------------------
  def initialize(user, action_id)
      event_id = action_id
      skill = $data_skills[action_id]
      if skill.note =~ /<Event ID = (\d+)>/
         event_id = $1.to_i
      end  
      original_event = @@events[event_id]
      if original_event == nil
         msgbox("There's no Event ID " + event_id.to_s + " on Tool Map!") 
         SceneManager.exit
         return 
      end  
      event = original_event.dup 
      event.x = user.x
      event.y = user.y
      pre_direction = event.pages[0].graphic.direction
      event.pages[0].graphic.direction = user.direction
      @character_name = event.pages[0].graphic
      super($game_map.map_id, event)
      self.action_attachment(action_id)
      self.tool_id = action_id
      self.diagonal = false
      self.diagonal_direction = 0
      self.sprite_angle_enable = false
      @action.user = user
      @remain_for_an_act = @action.duration.is_a?(Numeric)
      check_tool_effects(user,skill,pre_direction)
  end
  
  #--------------------------------------------------------------------------
  # ● update 
  #--------------------------------------------------------------------------
  def update
      super
      if @action == nil and @remain_for_an_act
         erase 
         $game_system.tools_on_map.delete(self.tool_id)
      end
      check_event_trigger_attack
  end
end

#===============================================================================
# ■ Game Player
#===============================================================================
class Game_Player < Game_Character
  attr_accessor :need_refresh
end

#===============================================================================
# ■ Token_Bullet  
#===============================================================================
class Token_Bullet < Token_Event
  
  #--------------------------------------------------------------------------
  # ● Check Tool Effects
  #-------------------------------------------------------------------------- 
  def check_tool_effects(user,skill,pre_direction)
      if @action.ally_damage or @action.all_damage    
         user.battler.invunerable_duration = 0
      end
     # Force Update Out Screen
     if user.battler.sensor_range >= 15 or
        skill.note =~ /<Update Out Screen>/
        self.force_update = true
     end  
     #Diagonal Effect
     if skill.note =~ /<Diagonal>/ or
        skill.note =~ /<All Direction>/ or
        skill.note =~ /<Three Direction>/
        self.diagonal = true
        self.diagonal_direction = user.diagonal_direction
        self.sprite_angle_enable = true
        user.diagonal_time = XAS_BA::DIAGONAL_DURATION if user.diagonal_direction != 0
        user.diagonal = true if user.tool_id > 0        
     end 
     #Auto Target 
     if skill.note =~ /<Auto Target>/
        if user.is_a?(Game_Event)
           self.moveto($game_player.x, $game_player.y)
        else  
           moveto($game_temp.xas_target_x, $game_temp.xas_target_y)
           $game_temp.xas_target_x = 0
           $game_temp.xas_target_y = 0      
           $game_temp.xas_target_time = 0
           $game_temp.xas_target_shoot_id = 0
        end   
     end
     #Barrier 
     if skill.note =~ /<Barrier>/
        self.tool_effect = "Barrier"
     end
     #Boomerang
     if skill.note =~ /<Boomerang = (\d+)>/
        self.tool_effect = "Boomerang"
        self.action.duration = 1000
        self.diagonal = true
        self.diagonal_direction = user.diagonal_direction
        self.force_update = true
        @move_frequency = 6
        @move_speed = 5
        @direction_fix = false
        @walk_anime = true
        @step_anime = true
        @force_action = "Forward" 
        @force_action_times = $1.to_i
     end     
      
   end
end 



#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ TOOL - AREA
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#===============================================================================
# ■ XAS ACTION
#===============================================================================
module XAS_ACTION

  #--------------------------------------------------------------------------
  # ● action_update
  #--------------------------------------------------------------------------
  def action_update
      return unless @action.is_a?(Game_Action_XAS)
      if @action.animation_time != [] and
         @action.animation_time[0] == @action.now_count
         animation_id = @action.animation_time[1]
         unless self.is_a?(Game_Player) or self.tool_id == 0
             self.animation_id = animation_id 
         end
      end
      @action.update
  end
    
  #--------------------------------------------------------------------------
  # ● Can Impact Target
  #--------------------------------------------------------------------------  
  def can_impact_target?
      return false if @action.nil? 
      return false if @action.attack_id == 0 
      return false if @action.first_impact_time > 0
      return false if @action.impact == false
      return false if self.jumping?
      return true
  end  
  
  #--------------------------------------------------------------------------
  # ● check_event_trigger_attack
  #--------------------------------------------------------------------------
  def check_event_trigger_attack()
      return unless can_impact_target?
      hit_check = false
      range = @action.attack_range
      hit = []
      targets = [$game_player] + $game_map.events.values
      for event in targets
        next if event == self or
                @action.hit_events.include?(event) or event.erased
        body_size      = event.body_size
        event_center_x = event.x 
        event_center_y = event.y - body_size
        if @action.short_range
           dx = event_center_x - $game_player.x
           dy = event_center_y - $game_player.y
        else
           dx = event_center_x - self.x
           dy = event_center_y - self.y
         end
        dx = (dx >= 0 ? [dx - body_size, 0].max : [dx + body_size, 0].min)
        dy = (dy >= 0 ? [dy - body_size, 0].max : [dy + body_size, 0].min)
        hit_check = true if in_range?(dx,dy,event,range) 
        hit.push(event) if hit_check
        hit_check = false
      end
      for event in hit
          if event.action_effect(self, self.action.attack_id)
             hit_check = true
          end
          if event.action_effect_page(self, self.action.attack_id)
             hit_check = true
         end         
         @action.hit_events.push(event) unless @action.multi_hit
         end
      if hit_check
         $game_temp.active_token = self
      end
  end

  #--------------------------------------------------------------------------
  # ● In Range?
  #--------------------------------------------------------------------------  
  def in_range?(dx,dy,event,range) 
      case @action.attack_range_type
            when 1 #RHOMBUS
              return true if (dx.abs + dy.abs <= range)
            when 2 #SQUARE
              return true if (dx.abs <= range and dy.abs <= range)
            when 3 #LINE
              case self.direction
                  when 2
                    return true if (dx == 0 and dy >= 0 and dy <= range)
                  when 8
                    return true if (dx == 0 and dy <= 0 and dy >= -range)
                  when 6
                    return true if (dy == 0 and dx >= 0 and dx <= range)
                  when 4
                    return true if (dy == 0 and dx <= 0 and dx >= -range)
              end
            when 4  #FRONT SQUARE   
              case self.direction
                 when 2
                    return true if (dx.abs <= range and dy >= 0 and dy.abs <= range)
                 when 4
                    return true if (dx.abs <= range and dx <= 0 and dy.abs <= range)  
                 when 6
                    return true if (dx.abs <= range and dx >= 0 and dy.abs <= range)
                 when 8
                    return true if (dx.abs <= range and dy <= 0 and dy.abs <= range)
              end              
            when 5  #FRONT RHOMBUS     
              case self.direction
                  when 2
                    return true if (dx.abs + dy.abs <= range and dy >= 0)
                  when 8
                    return true if (dx.abs + dy.abs <= range and dy <= 0)
                  when 6
                    return true if (dx.abs + dy.abs <= range and dx >= 0)
                  when 4
                    return true if (dx.abs + dy.abs <= range and dx <= 0)
              end          
            when 6  #WALL
              case self.direction
                 when 2
                    return true if (dx.abs <= range and dy == 0 )
                 when 4
                    return true if (dy.abs <= range and dx == 0)  
                 when 6
                    return true if (dy.abs <= range and dx == 0)
                 when 8
                    return true if (dx.abs <= range and dy == 0)
               end  
            when 7 #CROSS
                 return true if (dx.abs <= range and dy == 0)
                 return true if (dy.abs <= range and dx == 0)  
            end
     return false       
  end      
  
  #--------------------------------------------------------------------------
  # ●  action_effect Page
  #--------------------------------------------------------------------------
  def action_effect_page(attacker, attack_id)
      return false unless self.is_a?(Game_Event)
      return false if attacker.action.fake_id
      if attacker.action != nil
         check_auto_effect_page(attacker, attack_id) 
         check_reflectable_skills(attacker, attack_id)
      end
      for page in @event.pages
          if page.condition.variable_valid and
             page.condition.variable_id == XAS_SYSTEM::HIT_ID and 
             page.condition.variable_value == attack_id
             self.reaction_valid_attack_id = attack_id
             self.refresh
             @trigger = 0
             self.start
             return true
          end
      end
      return false
  end
  
  #--------------------------------------------------------------------------
  # ● Check Reflectable Skills
  #--------------------------------------------------------------------------    
  def check_reflectable_skills(attacker, attack_id)
      return if self.tool_id == 0
      return unless self.action.reflectable
      return unless attacker.action.can_reflect
      self.action.user = attacker.action.user
      self.action.hit_events = []  
      self.turn_back
  end  
  
  #--------------------------------------------------------------------------
  # ● Check Auto Effect Page
  #--------------------------------------------------------------------------  
  def check_auto_effect_page(attacker, attack_id)
      if self.treasure_time > 0
         if can_hit_take_treasure?(attacker, attack_id)
            execute_take_treasure(attacker, attack_id) 
         elsif self.temp_id == 0 and can_hold_treasure?(attacker, attack_id)   
            execute_hold_treasure(attacker, attack_id) 
         end  
      end
  end
  
  #--------------------------------------------------------------------------
  # ● Can Hit Take Treasure
  #--------------------------------------------------------------------------      
  def can_hit_take_treasure?(attacker, attack_id)
      return true if attacker.action.short_range
      return false
  end
  
  #--------------------------------------------------------------------------
  # ● Can Hold Treasure?
  #--------------------------------------------------------------------------        
  def can_hold_treasure?(attacker, attack_id)
      return true if attacker.tool_effect == "Boomerang"   
      return false 
  end  
  
  #--------------------------------------------------------------------------
  # ● Execute Hold Treasure
  #--------------------------------------------------------------------------      
  def execute_hold_treasure(attacker, attack_id)
      tr_time = (100 + XAS_BA::TREASURE_ERASE_TIME * 60) - 20
      return if self.treasure_time > tr_time
      self.temp_id = attacker.id    
  end  
  
  #--------------------------------------------------------------------------
  # ● Execute Take Treasure
  #--------------------------------------------------------------------------      
  def execute_take_treasure(attacker, attack_id)
      tr_time = (100 + XAS_BA::TREASURE_ERASE_TIME * 60) - 20
      return if self.treasure_time > tr_time
      self.x = $game_player.x
      self.y = $game_player.y
  end

  #--------------------------------------------------------------------------
  # ● body_size
  #--------------------------------------------------------------------------
  def body_size
      return 0
  end
  
  #--------------------------------------------------------------------------
  # ● action_clear
  #--------------------------------------------------------------------------
  def action_clear
      @action = nil
      @step_anime = false
  end
end

#===============================================================================
# ■ Game_Character
#===============================================================================
class Game_Character < Game_CharacterBase
    include XAS_ACTION
end

#===============================================================================
# ■  Game_Event
#===============================================================================
class Game_Event < Game_Character

  #--------------------------------------------------------------------------
  # * Refresh
  #--------------------------------------------------------------------------
  alias x_conditions_met conditions_met? 
  def conditions_met?(page)
      c = page.condition
      if c.variable_valid
         if c.variable_id == XAS_SYSTEM::HIT_ID and 
            c.variable_value == self.reaction_valid_attack_id
            return true
         end
       end
      x_conditions_met(page)
  end
  
end  

#===============================================================================
# ■  XAS_Dispose
#===============================================================================
module XAS_Dispose
  
  #--------------------------------------------------------------------------
  # ● update
  #--------------------------------------------------------------------------  
  def update
      action_update
      super
      if @action.is_a?(Game_Action_XAS) and @action.done?
         self.action_clear
      end
  end
end

#===============================================================================
# ■  Game_Player
#===============================================================================
class Game_Player < Game_Character
  include XAS_Dispose
end

#===============================================================================
# ■  Game_Event
#===============================================================================
class Game_Event < Game_Character
  include XAS_Dispose
end

#===============================================================================
# ■ XAS_StopToAction 
#===============================================================================
module XAS_StopToAction
  
  #--------------------------------------------------------------------------
  # ● acting? 
  #--------------------------------------------------------------------------  
  def acting?
      return false if self.battler == nil
      return true if self.battler.shield
      return true if self.action != nil 
      return false
  end
  
  #--------------------------------------------------------------------------
  # ● moving? 
  #--------------------------------------------------------------------------  
  def moving?
      return (super or self.acting? or self.stop)
  end
    
end

#===============================================================================
# ■ Game_Player  
#===============================================================================
class Game_Player < Game_Character
  include XAS_StopToAction
end

#===============================================================================
# ■ Game_Event  
#===============================================================================
class Game_Event < Game_Character
  attr_accessor :reaction_valid_attack_id
end


#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ TOOL - HIT EFFECT
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#===============================================================================
# ■ XRXS_BattlerAttachment
#==============================================================================
module XRXS_BattlerAttachment 

  #--------------------------------------------------------------------------
  # ● Can Hit Base?
  #--------------------------------------------------------------------------    
  def can_hit_base?(bullet, action_id)
      return false unless $game_system.xas_battle
      return false if self.battler == nil 
      return false if bullet == nil
      return false if action_id == nil or action_id <= 0
      return false if self.can_update == false
      return true
  end  
  
  #--------------------------------------------------------------------------
  # ● Action Effect
  #--------------------------------------------------------------------------  
  def action_effect(bullet, action_id)
      return unless can_hit_base?(bullet, action_id)
      skill = $data_skills[action_id]
      user = bullet.action.user
      attacker = (user == nil ? nil : user.battler)     
      tar_invu = bullet.action.target_invunerable_duration
      #CAN HIT?
      return unless action_can_hit_target?(bullet, user, skill,tar_invu)
      #REFLECT STATE
      return if reflect_state?(bullet, skill)
      #SHIELD 
      if target_shield_enabled?(attacker, skill, bullet)
         execute_guard_effect(user, skill, bullet, tar_invu)
         return 
      end
      #INVUNERABLE ACTIONS
      if target_invunerable_actions?(user, skill, bullet)
         execute_guard_effect(user, skill, bullet, tar_invu, false)
         return
      end   
      #GUARD DIRECTIONS
      if target_guard_directions?(user, skill, bullet)
         execute_guard_effect(user, skill, bullet, tar_invu)
         return        
      end  
      execute_hit_effect(attacker,skill, bullet , user, tar_invu )
      if self.is_a?(Game_Player)
         self.need_refresh = true
      end
  end

  #--------------------------------------------------------------------------
  # ● Reflect State?
  #--------------------------------------------------------------------------                 
  def reflect_state?(bullet, skill)
      if  bullet.action.reflectable and self.battler.state_reflect
          if skill.note =~ /<Auto Target>/
             bullet.moveto(bullet.action.user.x,bullet.action.user.y)
          else   
             bullet.turn_back
          end  
          bullet.action.user = self
          bullet.action.hit_events = []           
          bullet.turn_back
#          bullet.jump(0,0)
          bullet.turn_back
          self.battler.damage = XAS_WORD::REFLECT
          self.battler.damage_pop = true
          self.animation_id = XAS_ANIMATION::REFLECT_ANIMATION_ID
          self.battler.invunerable_duration = 20
         return true
     end 
     return false     
  end
  
 #--------------------------------------------------------------------------
 # ● Target Guard Directions?
 #--------------------------------------------------------------------------    
 def target_guard_directions?(user, skill, bullet)
     return false if self.battler.guard == false
     return false if bullet.action.ignore_guard
     if self.battler.guard_directions.include?(2) and
        ((self.direction == 2 and bullet.direction == 8) or
         (self.direction == 8 and bullet.direction == 2) or
         (self.direction == 6 and bullet.direction == 4) or
         (self.direction == 4 and bullet.direction == 6))
         return true
     elsif self.battler.guard_directions.include?(8) and
        ((self.direction == 8 and bullet.direction == 8) or
         (self.direction == 2 and bullet.direction == 2) or
         (self.direction == 6 and bullet.direction == 6) or
         (self.direction == 4 and bullet.direction == 4))
         return true
     elsif self.battler.guard_directions.include?(4) and
        ((self.direction == 2 and bullet.direction == 4) or
         (self.direction == 8 and bullet.direction == 6) or
         (self.direction == 6 and bullet.direction == 2) or
         (self.direction == 4 and bullet.direction == 8))
         return true         
     elsif self.battler.guard_directions.include?(6) and
        ((self.direction == 2 and bullet.direction == 6) or
         (self.direction == 8 and bullet.direction == 4) or
         (self.direction == 6 and bullet.direction == 8) or
         (self.direction == 4 and bullet.direction == 2))
         return true
     end       
     return false
  end
      
  #--------------------------------------------------------------------------
  # ● Target Invunerable Actions?
  #--------------------------------------------------------------------------            
  def target_invunerable_actions?(user, skill, bullet)
      return true if self.battler.invunerable_actions.include?(skill.id)
      return false
  end
  
  #--------------------------------------------------------------------------
  # ● Shoot Target Shield
  #--------------------------------------------------------------------------          
  def shoot_target_shield?(bullet,user, skill)
      return false unless self.battler.shield
      return false if bullet.action.ignore_guard
      return true if face_direction?(bullet)
      return false
  end
  
  #--------------------------------------------------------------------------
  # ● Action can hit target?
  #--------------------------------------------------------------------------        
  def action_can_hit_target?(bullet, user, skill,tar_invu)
      if user == nil
         return false
      end   
      if self.battler.invunerable
         return false
      end  
      if self.battler.dead?
         return false
      end   
      if self.battler.invunerable_duration > 0
         return false
      end   
      if @knock_back_duration != nil 
         return false unless bullet.action.ignore_knockback_invincible
      end
      if bullet.action.first_impact_time > 0
         return false 
      end
      if self.action != nil and self.action.user_invincible
         unless self.action.ally_damage and bullet.action.user == self.action.user
             return false
         end
      end  
      unless bullet.action.all_damage 
             if bullet.action.ally_damage 
                if user.battler.is_a?(Game_Actor)
                   return false if self.battler.is_a?(Game_Enemy)
                elsif user.battler.is_a?(Game_Enemy) 
                   return false if self.battler.is_a?(Game_Actor)
                end
             else    
                if user.battler.is_a?(Game_Actor)
                   return false if self.battler.is_a?(Game_Actor)
                elsif user.battler.is_a?(Game_Enemy) 
                   return false if self.battler.is_a?(Game_Enemy)
                end                 
             end              
      end
      return false if target_state_invunerable?(tar_invu)
      #return false if target_reflect_action?(bullet, user)
      return true
  end
  
  #--------------------------------------------------------------------------
  # ● Target Relfect Action
  #--------------------------------------------------------------------------          
  def target_reflect_action?(bullet, user)
      return false unless bullet.action.reflectable
      for i in $game_map.events.values
          if i.tool_id > 0 and i.action.can_reflect and
             i.tool_effect == "Barrier"# and i.action.user.battler.is_a?(self.battler)
             bullet.action.user = self
             bullet.action.hit_events = []  
             bullet.turn_back
             return true
             break
          end   
      end
      return false  
  end
  
  #--------------------------------------------------------------------------
  # ● Target State Invunerable
  #--------------------------------------------------------------------------        
  def target_state_invunerable?(tar_invu)
      if self.battler.state_invunerable
         self.battler.damage = XAS_WORD::INVINCIBLE 
         self.battler.damage_pop = true
         self.animation_id = XAS_ANIMATION::INVINCIBLE_ANIMATION_ID
         self.battler.invunerable_duration = tar_invu
         return true
      end
      return false
  end
  
  #--------------------------------------------------------------------------
  # ● Execute Hit Effect
  #--------------------------------------------------------------------------      
  def execute_hit_effect(attacker,skill, bullet , user, tar_invu)
      shoot_effect_before_damage(skill, bullet, user)
      execute_battler_skill_effect(attacker ,skill, user)
      if target_missed?(attacker)
         self.battler.invunerable_duration = 30
         return 
      end            
      execute_damage_pop(attacker,skill)
      shoot_effect_after_damage(skill, bullet, user) if can_damage_after_effect?
      execute_state_effect(skill, user,  bullet)    
      bullet.action.duration = 1 if remove_tool_after_hit?(skill, bullet, user)
      self.battler.invunerable_duration = tar_invu
      execute_blow_effect(skill,bullet) if can_blow_effect?
      execute_animation(skill, bullet, user)
      execute_tool_effects(skill, bullet , user)
  end
 
  #--------------------------------------------------------------------------
  # ● Execute Tool Effects
  #--------------------------------------------------------------------------              
  def execute_tool_effects(skill, bullet , user)
      execute_sticky_effect(skill, bullet, user)
      execute_bounce_effect(skill, bullet, user)
      execute_hit_action_effect(skill, bullet, user)
  end
    
  #--------------------------------------------------------------------------
  # ● Remove Tool After Hit?
  #--------------------------------------------------------------------------            
  def remove_tool_after_hit?(skill, bullet, user)
      return true if bullet.action.piercing == false
      return false
  end  
 
  #--------------------------------------------------------------------------
  # ● Execute Battler Skill Effect
  #--------------------------------------------------------------------------          
  def execute_battler_skill_effect(attacker ,skill, user)
      self.battler.item_apply(attacker, skill)
  end
  
  #--------------------------------------------------------------------------
  # ● Target Missed?
  #--------------------------------------------------------------------------        
  def target_missed?(attacker)
      if self.battler.result.missed 
         self.battler.damage = XAS_WORD::MISSED
         self.battler.damage_pop = true         
         return true
      end    
      if self.battler.result.evaded
         self.battler.damage = XAS_WORD::EVADED
         self.battler.damage_pop = true             
         return true 
      end  
      return false
  end  
  #--------------------------------------------------------------------------
  # ● Shoot Effect Before Damage
  #--------------------------------------------------------------------------        
  def shoot_effect_before_damage(skill, bullet, user)
  end
  
  #--------------------------------------------------------------------------
  # ● Shoot Effect After Damage
  #--------------------------------------------------------------------------          
  def shoot_effect_after_damage(skill, bullet, user)
      check_counter_attack(skill)
      self.battler.passive = false
  end
  
  #--------------------------------------------------------------------------
  # ● Shoot Effect After Damage
  #--------------------------------------------------------------------------            
  def check_counter_attack(skill)
      return if self.battler.is_a?(Game_Actor)
      return if self.battler.counter_action[2] == false
      return if self.battler.counter_action[1] > 0
      counter = XAS_BA_ENEMY::COUNTER_ATTACK[self.battler.enemy_id]
      if counter != nil
         counter_action_id = counter[rand(counter.size)]
         self.battler.counter_action[0] = counter_action_id
         self.battler.counter_action[1] = 15
      end  
  end  
  
  #--------------------------------------------------------------------------
  # ● Execute Bounce Effect
  #--------------------------------------------------------------------------             
  def execute_bounce_effect(skill, bullet, user)
      return false if bullet.action.hit_bounce == false
      bullet.bounce_direction
  end
  
  #--------------------------------------------------------------------------
  # ● Execute Stick Effect
  #--------------------------------------------------------------------------           
  def execute_sticky_effect(skill, bullet, user)
      return unless bullet.action.sticky
      return if bullet.temp_id !=  0
      bullet.pre_move_speed = bullet.move_speed
      bullet.temp_id = self.id
  end
  
  #--------------------------------------------------------------------------
  # ● Execute Hit Action Effect
  #--------------------------------------------------------------------------             
  def execute_hit_action_effect(skill, bullet, user)
      return if bullet.action.hit_action == 0
      self.battler.invunerable_duration = 1
      bullet.shoot(bullet.action.hit_action)
      bullet.action.duration = 9
      bullet.action.multi_hit = false
      bullet.character_name = ""
      bullet.x_pose_duration = 0
      bullet.x_pose_name = ""
      bullet.x_pose_original_name = ""       
  end
  
  #--------------------------------------------------------------------------
  # ● Can Damage Effect
  #--------------------------------------------------------------------------          
  def can_damage_after_effect?
      return false if self.battler.damage == nil
      return false unless self.battler.damage.is_a?(Numeric)
      return true
  end  
  
  #--------------------------------------------------------------------------
  # ● Execute State Effect
  #--------------------------------------------------------------------------        
  def execute_state_effect(skill, user,  bullet)   
      if user.battler.states.size != 0
         for i in user.battler.states
             execute_state_effect_user(skill, user, bullet,i)
         end    
      end
      if self.battler.states.size != 0
         for i in self.battler.states
             execute_state_effect_target(skill, user, bullet,i)
         end    
      end
  end
  
  #--------------------------------------------------------------------------
  # ● Execute State Effect User
  #--------------------------------------------------------------------------          
  def execute_state_effect_user(skill, user, bullet,i)
  
  end
  
  #--------------------------------------------------------------------------
  # ● Execute State Target
  #--------------------------------------------------------------------------          
  def execute_state_effect_target(skill, user, bullet,i)
      #Sleep 
      if self.battler.damage.is_a?(Numeric) and self.battler.damage > 0
         if i.note =~ /<Sleep>/  
            self.battler.remove_state(i.id)
         end
      end   
  end  
  
  #--------------------------------------------------------------------------
  # ● Execute Blow Effect
  #--------------------------------------------------------------------------      
  def execute_blow_effect(skill,bullet)
      if bullet.action.hit_hold_target and self.temp_id == 0     
         self.temp_id = bullet.id
         self.pre_move_speed = self.move_speed         
         self.moveto(bullet.x, bullet.y)
      end   
      $game_map.screen.start_shake(5, 5, 60) if bullet.action.hit_shake
      p = bullet.action.blow_power.to_i  
      d = bullet.direction    
      return if self.battler.damage.to_i <= 0
      return if p < 0
      self.blow(d, p)  
  end
    
  #--------------------------------------------------------------------------
  # ● Execute Animation
  #--------------------------------------------------------------------------        
  def execute_animation(skill, bullet, user)    
      self.animation_id = skill.animation_id
      tool_animation = bullet.action.second_animation_id
      user_animation = bullet.action.third_animation_id
      bullet.animation_id = tool_animation if tool_animation != 0
      user.animation_id = user_animation if user_animation != 0
  end  
    
  #--------------------------------------------------------------------------
  # ● Knock Back Disable
  #--------------------------------------------------------------------------      
  def knock_back_disable
    return false
  end
  
  #--------------------------------------------------------------------------
  # ● Dead?
  #--------------------------------------------------------------------------          
  def dead?
    return self.battler == nil ? false : self.battler.dead?
  end
  
end


#===============================================================================
# ■ XRXS_BattlerAttachment
#==============================================================================
module XRXS_BattlerAttachment 
 
  #--------------------------------------------------------------------------
  # ● Shoot Target Shield
  #--------------------------------------------------------------------------          
  def target_shield_enabled?(attacker, skill, bullet)
      return false unless self.battler.shield
      if bullet != nil
         return false if bullet.action.ignore_guard
         return true if face_direction?(bullet)         
      else   
         return false if attacker.battler.ignore_guard
         return true if face_direction?(attacker)         
      end  
      return false
  end  

  #--------------------------------------------------------------------------
  # ● Can Blow Effect
  #--------------------------------------------------------------------------        
  def can_blow_effect?
      return false if self.battler.no_knockback
      return false if $game_map.interpreter.running?
      return true 
  end  
 
 #--------------------------------------------------------------------------
 # ● Execute Guard Effect
 #--------------------------------------------------------------------------      
 def execute_guard_effect(attacker, skill, bullet, inv, erase_bullet = true)
     self.battler.invunerable_duration = inv
     damage_pop(XAS_WORD::GUARD)
     guard_animation_id = XAS_ANIMATION::GUARD_ANIMATION_ID
     self.animation_id = guard_animation_id if guard_animation_id != 0   
     if bullet != nil 
        bullet.erase if erase_bullet
     else   
        blow_reverse(attacker) unless attacker.battler.no_knockback 
     end   
 end
   
 #--------------------------------------------------------------------------
 # ● Blow Reverse
 #--------------------------------------------------------------------------      
 def blow_reverse(attacker)
     return if attacker.battler.no_knockback
     case attacker.direction
        when 2
           d = 8
        when 4
           d = 6
        when 6
           d = 4 
        when 8  
           d = 2
     end
     attacker.jump(0,0)   
     attacker.blow(d,1)
 end 
 
 #--------------------------------------------------------------------------
 # ● Can Attack Effect
 #--------------------------------------------------------------------------      
 def damage_pop(text)
     return unless XAS_WORD::ENABLE_WORD
     self.battler.damage = text
     self.battler.damage_pop = true
 end
 
 #--------------------------------------------------------------------------
 # ● Shd Direction?
 #--------------------------------------------------------------------------      
 def face_direction?(attacker)
     target = self.direction  
     case target
          when 2
             return true if attacker.direction == 8
          when 4
             return true if attacker.direction == 6
          when 6
             return true if attacker.direction == 4
          when 8  
             return true if attacker.direction == 2     
     end
     return false
 end   
 
 #--------------------------------------------------------------------------
 # ● Execute Damage Pop
 #--------------------------------------------------------------------------       
 def execute_damage_pop(attacker,skill = nil)
     if skill != nil
        return if skill.note =~ /<No Damage Pop>/
        if skill.damage.to_mp?
           dam = self.battler.result.mp_damage
           self.battler.damage_type = "Mp"      
        elsif skill.damage.to_hp?
           dam = self.battler.result.hp_damage 
           self.battler.damage_type = "Critical"  if self.battler.result.critical 
        end   
        if dam != nil 
           if skill.damage.drain? or skill.damage.drain?
              attacker.damage = -dam
              attacker.damage_type = self.battler.damage_type 
              attacker.damage_pop = true
           end  
           self.battler.damage = dam
           self.battler.damage_pop = true
        end
     else
        if self.battler.result.hp_damage != nil
           self.battler.damage = self.battler.result.hp_damage 
           self.battler.damage_type = "Critical" if self.battler.result.critical   
           self.battler.damage_pop = true      
        end   
     end  
 end  
 
end   



#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ TOOL - EQUIP
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#==============================================================================
# ■ Window Skill List
#==============================================================================
class Window_SkillList < Window_Selectable
  
  #--------------------------------------------------------------------------
  # ● Process OK
  #--------------------------------------------------------------------------                   
  alias x_skill_process_ok process_ok
  def process_ok
      return if can_equip_skill_action?
      x_skill_process_ok
  end

  #--------------------------------------------------------------------------
  # ● Can Equip Skill Action
  #--------------------------------------------------------------------------                     
  def can_equip_skill_action?
      return false if $game_party.in_battle 
      skill = @data[index]
      if skill != nil and skill.note =~ /<Duration = (\d+)>/
         @actor.skill_id = skill.id
         Sound.play_equip
         return true         
      end
      return false
  end
  
end

#==============================================================================
# ■ Window Item List
#==============================================================================
class Window_ItemList < Window_Selectable
  
  #--------------------------------------------------------------------------
  # ● Process OK
  #--------------------------------------------------------------------------                   
  alias x_item_process_ok process_ok
  def process_ok
      return if can_equip_item_action?
      x_item_process_ok
  end

  #--------------------------------------------------------------------------
  # ● Can Equip Item Action
  #--------------------------------------------------------------------------                     
  def can_equip_item_action?
      return false if $game_party.in_battle 
      item = @data[index]
      if item != nil and item.is_a?(RPG::Item) and
         item.note =~ /<Action ID = (\d+)>/
         actor = $game_party.members[0]
         actor.item_id = item.id
         Sound.play_equip
         return true         
      end
      return false
  end
  
end



#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ BATTLER - INITIALIZE
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#===============================================================================
# ■ Game Character
#==============================================================================
class Game_Character < Game_CharacterBase
  
  #--------------------------------------------------------------------------
  # ● Update Battler
  #--------------------------------------------------------------------------      
  def update_battler
      update_battler_pose 
      update_battler_parameters
      update_battler_stop_movement
      update_battler_knockbacking
      update_battler_counter_action
      unless self.battler.hp == 0
          update_battler_cast_action    
          update_battler_move_speed if can_update_battler_move_speed?
          update_battler_states_effect
          update_battler_attacking
      else
          update_battler_defeat_process
      end 
  end  

end

#===============================================================================
# ■ Game Player
#===============================================================================
class Game_Player < Game_Character
  include XRXS_BattlerAttachment
  
  #--------------------------------------------------------------------------
  # ● Battler
  #--------------------------------------------------------------------------  
  def battler
      return $game_party.members[0]
  end
  
  #--------------------------------------------------------------------------
  # ● Refresh Interpreter Effect
  #--------------------------------------------------------------------------        
  def refresh_interpreter_effect 
      $game_system.old_interpreter_running = $game_map.interpreter.running?
      if $game_system.old_interpreter_running 
         $game_temp.reset_battler_time = 60 * 4
      end  
      reset_battler_setting  
  end  
  
  #--------------------------------------------------------------------------
  # ● Update Battler Setting Time
  #--------------------------------------------------------------------------           
  def update_reset_battler_setting_time
      return if $game_temp.reset_battler_time == 0
      $game_temp.reset_battler_time -= 1
      reset_battler_setting_running if $game_temp.reset_battler_time == 0
  end
  
  #--------------------------------------------------------------------------
  # ● Update Battler Setting
  #--------------------------------------------------------------------------         
  def reset_battler_setting
      reset_player_parameters
      for ally in $game_party.members
         reset_members_parameters(ally)
      end
      for enemy in $game_map.events.values 
          reset_enemies_parameters(enemy) if enemy.battler != nil
      end    
      $game_map.need_refresh = true  
  end  
  
  #--------------------------------------------------------------------------
  # ● Update Battler Setting Running
  #--------------------------------------------------------------------------         
  def reset_battler_setting_running
      reset_player_parameters_running
      for ally in $game_party.members
         reset_members_parameters_running(ally)
      end
      for enemy in $game_map.events.values 
          reset_enemies_parameters(enemy) if enemy.battler != nil
      end    
      $game_map.need_refresh = true  
  end    
  
  #--------------------------------------------------------------------------
  # ● Reset Enemies Parameters
  #--------------------------------------------------------------------------          
  def reset_enemies_parameters(enemy)
      enemy.battler.cast_action[0] = 0
      enemy.battler.cast_action[1] = 0
      enemy.battler.cast_action[2] = 0
      enemy.battler.cast_action[3] = 0  
      enemy.battler.cast_action[4] = 0
      enemy.battler.counter_action[0] = 0
      enemy.battler.counter_action[1] = 0
      enemy.battler.counter_action[2] = true
      enemy.battler.invunerable_duration = 0
      enemy.knock_back_duration = nil
  end  
  
  #--------------------------------------------------------------------------
  # ● Reset Members Parameters
  #--------------------------------------------------------------------------          
  def reset_members_parameters(ally)
      ally.old_level = ally.level
      ally.shield = false
      ally.x_charge_action[0] = 0
      ally.x_charge_action[1] = 0
      ally.x_charge_action[2] = 0
      ally.x_charge_action[3] = 0
      ally.cast_action[0] = 0
      ally.cast_action[1] = 0
      ally.cast_action[2] = 0
      ally.cast_action[3] = 0  
      ally.cast_action[4] = 0
      ally.counter_action[0] = 0
      ally.counter_action[1] = 0
      ally.counter_action[2] = true
      ally.invunerable_duration = 0
  end
  
  #--------------------------------------------------------------------------
  # ● Reset Player Parameters
  #--------------------------------------------------------------------------          
  def reset_player_parameters
      make_pose("", 1) unless $game_player.action != nil
      $game_temp.xas_target_time = 0
      $game_temp.xas_target_shoot_id = 0
      $game_temp.xas_target_x = 0       
      @knock_back_duration = nil
      @dash_active = false
  end
    
  
  #--------------------------------------------------------------------------
  # ● Reset Members Parameters Running
  #--------------------------------------------------------------------------          
  def reset_members_parameters_running(ally)
      ally.old_level = ally.level
      ally.shield = false
      unless ally.x_charge_action[1] > 0
      ally.x_charge_action[0] = 0
      ally.x_charge_action[1] = 0
      ally.x_charge_action[2] = 0
      ally.x_charge_action[3] = 0
      end
      unless ally.cast_action[1] > 0
         ally.cast_action[0] = 0
         ally.cast_action[1] = 0
         ally.cast_action[2] = 0
         ally.cast_action[3] = 0  
         ally.cast_action[4] = 0
      end
      ally.counter_action[0] = 0
      ally.counter_action[1] = 0
      ally.counter_action[2] = true
      ally.invunerable_duration = 0
  end
  
  #--------------------------------------------------------------------------
  # ● Reset Player Parameters Running
  #--------------------------------------------------------------------------          
  def reset_player_parameters_running
      $game_temp.xas_target_time = 0
      $game_temp.xas_target_shoot_id = 0
      $game_temp.xas_target_x = 0       
      @knock_back_duration = nil
      @dash_active = false
  end
  
end

#===============================================================================
# ■ Game Follower
#===============================================================================
class Game_Follower < Game_Character
  include XRXS_BattlerAttachment
  
  #--------------------------------------------------------------------------
  # ● Battler
  #--------------------------------------------------------------------------    
  def battler
      return $game_party.members[@member_index]
  end
end

#===============================================================================
# ■ Game Follower
#===============================================================================
class Game_Followers 
  include XRXS_BattlerAttachment
  
  #--------------------------------------------------------------------------
  # ● Battler
  #--------------------------------------------------------------------------    
  def battler
      return $game_party.members[@member_index]
  end
end
#===============================================================================
# ■ Game_Vehicle
#===============================================================================
class Game_Vehicle < Game_Character
  include XRXS_BattlerAttachment
  attr_reader   :collision_attack
  
  #--------------------------------------------------------------------------
  # ● Battler
  #--------------------------------------------------------------------------      
  def battler
     return @battler
  end  
end  

#===============================================================================
# ■ Game Event
#===============================================================================
class Game_Event < Game_Character
  
  include XRXS_BattlerAttachment
  
  #--------------------------------------------------------------------------
  # ● Battler
  #--------------------------------------------------------------------------    
  def battler
    return @battler
  end
  
 #--------------------------------------------------------------------------
 # ● Battler?
 #--------------------------------------------------------------------------           
 def battler?
     return false if self.erased
     return false if self.battler == nil
     return false if self.dead?
     return false if self.battler.no_damage_pop
     return false if self.battler.invunerable
     return true
 end  
 
  #--------------------------------------------------------------------------
  # ● Refresh
  #--------------------------------------------------------------------------    
  alias xrxs64c_refresh refresh
  def refresh
      xrxs64c_refresh
      self.battler_recheck
  end
    
  #--------------------------------------------------------------------------
  # ● Battler Recheck
  #--------------------------------------------------------------------------    
  def battler_recheck
      return if @battler != nil
      return if @page == nil
      if self.name =~ /<Actor>/       
         actor = $game_party.members[0]
         @battler = Game_Actor.new(actor.id)
         return
      else
         @enemy_id = 0
         if self.name =~ /<Enemy(\d+)>/i
            @enemy_id = $1.to_i    
         end           
         return if @enemy_id <= 0
         @battler = Game_Enemy.new(1, @enemy_id)
         self.force_update = true if self.battler.sensor_range >= 15         
      end  
  end
    
  #--------------------------------------------------------------------------
  # ● Battler Recheck
  #--------------------------------------------------------------------------      
  def enemy_id
      return @enemy_id
  end
  
  #--------------------------------------------------------------------------
  # ● body_size
  #--------------------------------------------------------------------------        
  def body_size
      if self.battler != nil
         return self.battler.body_size
      else
         return 0
      end  
  end

end


#===============================================================================
# ■ Game_Battler
#===============================================================================
class Game_Battler 
  attr_accessor :sensor_range
  attr_accessor :body_size
  attr_accessor :breath_effect
  attr_accessor :breath_duration
  attr_accessor :fast_breath_effect
  attr_accessor :no_knockback
  attr_accessor :passive  
  attr_accessor :attack_animation_id
  attr_accessor :ignore_guard
  attr_accessor :no_damage_pop
  
  #--------------------------------------------------------------------------
  # ● Initialize
  #--------------------------------------------------------------------------      
  alias x_e_initialize initialize 
  def initialize  
      x_e_initialize
      @sensor_range = 4
      @body_size = 0
      @breath_effect = false
      @breath_duration = 0
      @fast_breath_effect = false
      @no_knockback = false
      @passive = false     
      @attack_animation_id = 0
      @ignore_guard = false
      @no_damage_pop = false
  end  
end

#===============================================================================
# ■ Game_Enemy
#===============================================================================
class Game_Enemy < Game_Battler
    
  #--------------------------------------------------------------------------
  # ● Initialize
  #--------------------------------------------------------------------------      
  alias x_e2_initialize initialize 
  def initialize(index, enemy_id)
      x_e2_initialize(index, enemy_id)
      enemy = $data_enemies[@enemy_id]
      setup_enemy_note(enemy)
  end  
  
  #--------------------------------------------------------------------------
  # ● Setup X Note Elements
  #--------------------------------------------------------------------------          
  def setup_enemy_note(enemy)
      if enemy.note =~ /<Sensor Range = (\d+)>/
         @sensor_range = $1.to_i
      end   
      if enemy.note =~ /<Body Size = (\d+)>/
         @body_size = $1.to_i
      end
      if enemy.note =~ /<Attack Animation = (\d+)>/
         @attack_animation_id = $1.to_i
      end  
      if enemy.note =~ /<Death Zoom = (\d+)>/
         @death_zoom_effect = $1.to_i
      end 
      if enemy.note =~ /<Knockback Duration = (\d+)>/
         @knockback_duration = $1.to_i
      end       
      if enemy.note =~ /<Ignore Guard>/ 
         @ignore_shield = true
      end
      if enemy.note =~ /<Invunerable>/ 
         @invunerable = true
      end
      if enemy.note =~ /<Breath Effect>/  
         @breath_effect = true
      end
      if enemy.note =~ /<Knockback Disable>/        
         @no_knockback = true
      end
      if enemy.note =~ /<Passive>/  
         @passive = true
      end
      if enemy.note =~ /<No Damage Pop>/  
         @no_damage_pop = true
      end   
      invunerable_actions_ids = XAS_BA_ENEMY::INVUNERABLE_ACTIONS[@enemy_id]
      if invunerable_actions_ids != nil
         @invunerable_actions = invunerable_actions_ids
      end   
      guard_directions_ids = XAS_BA_ENEMY::GUARD_DIRECTIONS[@enemy_id]
      if guard_directions_ids != nil
         @guard_directions = guard_directions_ids
      end          
  end
  
  
end  


#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ BATTLER - EVENT SENSOR
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#===============================================================================
# ■ XRXS_Enemy_Sensor
#===============================================================================
module XRXS_EnemySensor
  
  #--------------------------------------------------------------------------
  # ● Update Sensor
  #--------------------------------------------------------------------------        
  def update_sensor
      if self.battler != nil and self.battler.sensor_range > 0  
         sensor_area = self.battler.sensor_range
      else  
         sensor_area = $game_variables[XAS_BA::DEFAULT_SENSOR_RANGE_VARIABLE_ID]
      end
      sensor_area = -1 if cancel_sensor?
      distance = ($game_player.x - self.x).abs + ($game_player.y - self.y).abs
      enable   = (distance <= sensor_area)
      key = [$game_map.map_id, self.id, XAS_BA::SENSOR_SELF_SWITCH]
      last_enable = $game_self_switches[key]
      last_enable = false if last_enable == nil
      if enable != last_enable
         touch_attack(false)
         @collision_attack = false
         @pattern = 0
         @pattern_count = 0               
         $game_self_switches[key] = enable
         self.refresh
      end
  end
  
  #--------------------------------------------------------------------------
  # ● Can Update Sensor
  #--------------------------------------------------------------------------            
  def can_update_sensor?
      return false if @sensor_enable == false
      return false if self.dead? 
      return false if self.erased 
      return false if self.stop
      return false if self.knockbacking?
      return true
  end
  
  #--------------------------------------------------------------------------
  # ● refresh_sensor
  #--------------------------------------------------------------------------          
  def refresh_sensor
      touch_attack(false)
      key = [$game_map.map_id, self.id, XAS_BA::SENSOR_SELF_SWITCH]
      $game_self_switches[key] = false
      @pattern = 0
      @pattern_count  = 0         
      self.refresh        
  end  
  
  #--------------------------------------------------------------------------
  # ● Cancel Sensor
  #--------------------------------------------------------------------------          
  def cancel_sensor?  
      return false if self.battler == nil
      return true if self.battler.passive 
      return false
  end
  
end

#===============================================================================
# ■  Game Event
#===============================================================================
class Game_Event < Game_Character
  
  attr_accessor :sensor_enable
  
  #--------------------------------------------------------------------------
  # ● Initialize
  #--------------------------------------------------------------------------            
  alias x_sensor_initialize initialize
  def initialize(map_id, event)
      @sensor_enable = false
      x_sensor_initialize(map_id, event)
  end  
  
  #--------------------------------------------------------------------------
  # ● Conditions Met
  #--------------------------------------------------------------------------
  alias x_sensor_conditions_met conditions_met?
  def conditions_met?(page)
      c = page.condition
      if c.self_switch_ch == XAS_BA::SENSOR_SELF_SWITCH
         @sensor_enable = true
      end
      x_sensor_conditions_met(page)    
  end
end

#===============================================================================
# ■  Game Event
#===============================================================================
class Game_Character < Game_CharacterBase
      include XRXS_EnemySensor
end

#===============================================================================
# ■  Game Character
#===============================================================================
class Game_Character < Game_CharacterBase
      attr_writer   :opacity
end



#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ BATTLER - ACTION
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#===============================================================================
# ■ Game Character
#==============================================================================
class Game_Character < Game_CharacterBase
  
  #--------------------------------------------------------------------------
  # ● Can Update Battler Move Speed
  #--------------------------------------------------------------------------                  
  def can_update_battler_move_speed?
      return false if @temp_id > 0
      return false if moving?    
      return true
  end  
  
  #--------------------------------------------------------------------------
  # ● Can Update Battler?
  #--------------------------------------------------------------------------                
  def can_update_battler?
      return false unless $game_system.xas_battle
      return false if self.battler == nil
      return false unless party_system?
      return true
  end  

  #--------------------------------------------------------------------------
  # ● Party System
  #--------------------------------------------------------------------------                  
  def party_system?
      return false if self.battler == nil
      if $xas_party_system == nil and self.battler.is_a?(Game_Actor)
         return false if self.battler.actor_id != $game_party.members[0].actor_id 
      end
      return true
  end
  
  #--------------------------------------------------------------------------
  # ● Reset Battler Temp
  #--------------------------------------------------------------------------                  
  def reset_battler_temp
      reset_cast_temp   
      reset_charge_temp 
  end  
  
  #--------------------------------------------------------------------------
  # ● Reset Charge Temp
  #--------------------------------------------------------------------------                    
  def reset_charge_temp  
      return if self.battler == nil
      return if self.battler.is_a?(Game_Enemy)
      self.battler.x_charge_action[0] = 0
      self.battler.x_charge_action[1] = 0
      self.battler.x_charge_action[2] = 0
      self.battler.x_charge_action[3] = 0
  end
  
  #--------------------------------------------------------------------------
  # ● Reset Battler Temp
  #--------------------------------------------------------------------------                    
  def reset_cast_temp   
      return if self.battler == nil
      self.battler.cast_action[0] = 0
      self.battler.cast_action[1] = 0
      self.battler.cast_action[2] = 0
      self.battler.cast_action[3] = 0  
      self.battler.cast_action[4] = 0
  end
    
  #--------------------------------------------------------------------------
  # ● update_battler_parameters
  #--------------------------------------------------------------------------    
  def update_battler_parameters
      @stop_count = -1 if can_stop_battler? 
      self.battler.invunerable_duration -= 1 if self.battler.invunerable_duration > 0 
      unless @stop
         @knock_back_duration = 30 if @temp_id > 0
      end   
  end    
  
  #--------------------------------------------------------------------------
  # ● Can Stop Battler
  #--------------------------------------------------------------------------      
  def can_stop_battler? 
      return false if self.is_a?(Game_Player)
      return true if self.knockbacking?
      return true if self.dead?
      return true if self.stop 
      return false 
  end
  
  #--------------------------------------------------------------------------
  # ● Update Battler Counter Action
  #--------------------------------------------------------------------------                    
  def update_battler_counter_action
      return if self.battler.counter_action[1] == 0
      self.battler.counter_action[1] -= 1
      if self.battler.counter_action[1] == 0
         turn_toward_player
         self.battler.damage = XAS_WORD::COUNTER
         self.battler.damage_pop = true 
         self.shoot(self.battler.counter_action[0])
         self.battler.counter_action[0] = 0
      end   
  end  
  
  #--------------------------------------------------------------------------
  # ● Update Cast Action
  #--------------------------------------------------------------------------          
  def update_battler_cast_action    
      return unless can_update_cast_action? 
      self.battler.cast_action[3] += 1
      if self.battler.cast_action[3] > XAS_ANIMATION::LOOP_ANIMATIONS_SPEED
         self.battler.cast_action[3] = 0 
         self.animation_id =  self.battler.cast_action[2]
      end  
      self.battler.cast_action[4] += 1 
      if self.battler.cast_action[4] >= self.battler.cast_action[1]
          self.shoot(self.battler.cast_action[0])
      end
  end  
  
  #--------------------------------------------------------------------------
  # ● Can Update Cast Action
  #--------------------------------------------------------------------------            
  def can_update_cast_action? 
      return false if self.battler.cast_action[1] == 0    
      return false if @stop
      return true
  end
  
  #--------------------------------------------------------------------------
  # ● Can Blow Effect
  #--------------------------------------------------------------------------              
  def can_blow? 
      return false if self.stop and not self.battler.state_sleep
      return false if self.battler.no_knockback    
      return false if self.is_a?(Game_Player) and self.action != nil
      return true
  end   
    
  #--------------------------------------------------------------------------
  # ● Blow Effect
  #--------------------------------------------------------------------------        
  def blow(d, power = 1)
      return unless can_blow? 
      jump(0,0)
      self.battler.invunerable_duration = 30 if self.battler.invunerable_duration <= 0
      if self.is_a?(Game_Event)
         @collision_attack = false  
      end
      @knock_back_duration = self.battler.knockback_duration 
      refresh_sensor if self.is_a?(Game_Event)
      pre_direction = self.direction
      pre_direction_fix = self.direction_fix
      self.turn_reverse(d)      
      self.direction_fix = true
      power.times do
        case d 
           when 2; @y += 1 if passable?(@x, @y, d)
           when 4; @x -= 1 if passable?(@x, @y, d)
           when 6; @x += 1 if passable?(@x, @y, d)
           when 8; @y -= 1 if passable?(@x, @y, d)
        end
      end
      self.direction_fix = pre_direction_fix
      self.direction = pre_direction
  end
  
  #--------------------------------------------------------------------------
  # ● Can Stop Battler Movement
  #--------------------------------------------------------------------------            
  def can_stop_battler_movement?
      return false if self.dead?   
      return true if self.battler.state_sleep
      return true if self.battler.state_stop
      return false
  end  
  
  #--------------------------------------------------------------------------
  # ● Impact
  #--------------------------------------------------------------------------              
  def impact(enable = true)
      return if self.tool_id == 0
      return if self.action == nil
      self.action.impact = enable
  end
  
  #--------------------------------------------------------------------------
  # ● Update Battler Stop Movement
  #--------------------------------------------------------------------------              
  def update_battler_stop_movement 
      unless can_stop_battler_movement?
          @stop = false   
          return
      end
      @knock_back_duration = nil
      @stop = true      
      @step_anime = false    
      reset_battler_temp
      if self.battler.state_sleep
         make_pose("_Hit", 2)   
      else
         make_pose("", 2) 
      end  
      if self.is_a?(Game_Event)
         @collision_attack = false
      end  
  end
    
  #--------------------------------------------------------------------------
  # ● Update Attacking
  #--------------------------------------------------------------------------              
  def update_battler_attacking 
      return unless can_update_attacking?
      make_pose("_Atk", 2) 
  end

  #--------------------------------------------------------------------------
  # ● Can Update Attacking
  #--------------------------------------------------------------------------              
  def can_update_attacking?
      return false if self.battler.is_a?(Game_Actor)
      return false if @collision_attack == false  
      return true
  end  
  
  #--------------------------------------------------------------------------
  # ● Update Battler Knobacking
  #--------------------------------------------------------------------------            
  def update_battler_knockbacking
       return unless self.knockbacking?
       @pattern = 0
       @knock_back_duration -= 1 if can_remove_knockback?
       make_pose("_Hit", 2)        
       if self.is_a?(Game_Event)
          @collision_attack = false
       end         
       if @knock_back_duration <= 0
          @knock_back_duration = nil
          make_pose("", 0) 
          touch_attack(false) if self.is_a?(Game_Event)
          @character_name = @x_pose_original_name
       end
  end  
    
  #--------------------------------------------------------------------------
  # ● Can Remove Knockback
  #--------------------------------------------------------------------------              
  def can_remove_knockback?
      return true
  end

  #--------------------------------------------------------------------------
  # ● knockbacking?
  #--------------------------------------------------------------------------            
  def knockbacking?
      return false if self.battler == nil
      return false if @stop
      return true if @knock_back_duration != nil
      return false
  end

  #--------------------------------------------------------------------------
  # ● collapsing?
  #--------------------------------------------------------------------------          
  def collapsing?
      return self.collapse_duration.to_i > 0
  end
    
  #--------------------------------------------------------------------------
  # ● Seal Effect
  #--------------------------------------------------------------------------          
  def seal_effect
      Sound.play_buzzer
      if XAS_WORD::ENABLE_WORD
         self.battler.damage = XAS_WORD::SEAL
         self.battler.damage_pop = true
      end   
  end    
  
end

#===============================================================================
# ■ XAS_DamageStop
#===============================================================================
module XAS_DamageStop
  
  #--------------------------------------------------------------------------
  # ● Acting
  #--------------------------------------------------------------------------             
  def acting?
      return (super or self.knockbacking? or self.collapsing? or self.stop)
  end
end

#===============================================================================
# ■ Game_Player
#===============================================================================
class Game_Player < Game_Character
      include XAS_DamageStop
end

#===============================================================================
# ■ Game_Event
#===============================================================================
class Game_Event < Game_Character
      include XAS_DamageStop
end



#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ BATTLER - TOUCH EFFECT
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#===============================================================================
# ■ XRXS_BattlerAttachment
#==============================================================================
module XRXS_BattlerAttachment 
  
  #--------------------------------------------------------------------------
  # ● Attack Effect
  #--------------------------------------------------------------------------    
  def attack_effect(attacker)
      return false unless $game_system.xas_battle    
      return if self.battler == nil or attacker == nil
      return unless can_attack_effect?(attacker)
      if target_shield_enabled?(attacker, nil, nil)
         execute_guard_effect(attacker, nil, nil, 30)
         return 
      end   
      execute_attack_effect(attacker)
 end
    
 #--------------------------------------------------------------------------
 # ● Can Attack Effect
 #--------------------------------------------------------------------------     
 def can_attack_effect?(attacker)
     return false if self.can_update == false
     return false if @knock_back_duration != nil 
     return false if attacker.stop
     return false if self.battler.invunerable
     return false if self.battler.invunerable_duration > 0
     return false if self.action != nil and self.action.user_invincible
     return false if seal_attack?(attacker.battler)     
     return false if target_state_invunerable?(30)
     return true
 end  
  
 #--------------------------------------------------------------------------
 # ● Attack Target Shield
 #--------------------------------------------------------------------------     
 def attack_target_shield?(attacker)
     return false if attacker.battler.ignore_shield   
     return false unless self.battler.shield
     return true if face_direction?(attacker)
     return false
 end  
 
 #--------------------------------------------------------------------------
 # ● Seal Attack?
 #--------------------------------------------------------------------------               
 def seal_attack?(attacker)
     if attacker.state_seal_attack or attacker.state_mute
        attacker.damage = XAS_WORD::SEAL
        attacker.damage_pop = true
        self.battler.invunerable_duration = 30
        return true 
     end 
     return false
 end   
 
 #--------------------------------------------------------------------------
 # ● Execute Attack Damage
 #--------------------------------------------------------------------------       
 def execute_attack_damage(attacker)
     #if self.battler.agi > (rand(attacker.battler.agi) * 2)
     #   self.battler.result.missed = true
     #   return
     #end
     damage = ((attacker.battler.atk * 4) - (self.battler.def * 2)).truncate
     damage = 0 if damage < 0
     self.battler.result.hp_damage = damage
     #self.battler.result.critical   
     self.battler.hp -= damage.abs
 end
 
 #--------------------------------------------------------------------------
 # ● Execute Attack Effect
 #--------------------------------------------------------------------------      
 def execute_attack_effect(attacker)
     execute_attack_effect_before_damage(attacker)
     execute_attack_damage(attacker)
     if target_missed?(attacker)
        self.battler.invunerable_duration = 30
        return 
     end
     execute_damage_pop(attacker)
     execute_attack_effect_after_damage(attacker) if can_check_after_attack_effect?(attacker)   
     execute_state_effect(nil, attacker, nil)    
     self.battler.invunerable_duration = 20 + XAS_BA::DEFAULT_KNOCK_BACK_DURATION
     if attacker.battler.attack_animation_id != 0
        self.animation_id = attacker.battler.attack_animation_id 
     end   
     if self.battler.damage.to_i > 0
        self.blow(attacker.direction, 1) if can_blow_effect?
     end
     if self.is_a?(Game_Player)
        self.need_refresh = true
     end
 end  
     
 #--------------------------------------------------------------------------
 # ● Can Check After Attack Effect?  
 #--------------------------------------------------------------------------        
 def can_check_after_attack_effect?(attacker)   
     return false unless self.battler.damage.is_a?(Numeric) 
     return true
 end
 
 #--------------------------------------------------------------------------
 # ● Execute Attack Effect Before Damage
 #--------------------------------------------------------------------------       
 def execute_attack_effect_before_damage(attacker)
 
 end
 
 #--------------------------------------------------------------------------
 # ● Execute Attack Effect After Damage
 #--------------------------------------------------------------------------       
 def execute_attack_effect_after_damage(attacker)
 
 end 
 
end

#===============================================================================
# ■ Game Player
#===============================================================================
class Game_Player < Game_Character  
  #--------------------------------------------------------------------------
  # ● Check Event Trigger Touch
  #--------------------------------------------------------------------------             
  alias xrxs64c_check_event_trigger_touch check_event_trigger_touch
  def check_event_trigger_touch(x, y)
      xrxs64c_check_event_trigger_touch(x, y)
      if $game_map.interpreter.running?
         return
      end
      for event in $game_map.events.values
          next unless event.collision_attack
          unless [1,2].include?(event.trigger)
             if event.battler != nil and event.x == x and event.y == y
                $game_player.attack_effect(event)
             end
          end
      end
  end
end

#===============================================================================
# ■ Game Event
#===============================================================================
class Game_Event < Game_Character
  
  #--------------------------------------------------------------------------
  # ● Check Event Trigger Touch
  #--------------------------------------------------------------------------             
  alias xrxs64c_check_event_trigger_touch check_event_trigger_touch
  def check_event_trigger_touch(x, y)
    xrxs64c_check_event_trigger_touch(x, y)
    if $game_map.interpreter.running?
       return
    end
    return unless self.collision_attack
    if self.battler != nil and x == $game_player.x and y == $game_player.y
       $game_player.attack_effect(self)
    end
  end
end



#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ BATTLER - MOVE SPEED
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#==============================================================================
# ■ Game_Character
#==============================================================================
class Game_Character < Game_CharacterBase
  
  include XAS_BA
  attr_accessor :base_move_speed
  attr_accessor :dash_move_speed
  attr_accessor :move_speed
  
 #--------------------------------------------------------------------------
 # ● Initialize
 #--------------------------------------------------------------------------  
  alias x_move_speed_initialize initialize 
  def initialize
      @base_move_speed = BASE_MOVE_SPEED
      @dash_move_speed = 0
      x_move_speed_initialize
  end  
 
 #--------------------------------------------------------------------------
 # ● update_battler_move_speed
 #--------------------------------------------------------------------------
  def update_battler_move_speed
      @dash_move_speed = @dash_active ? DASH_MOVE_SPEED : 0
      sp1 = @base_move_speed
      sp2 = @dash_move_speed
      sp3 = self.battler.state_move_speed
      @move_speed = (sp1 + sp2 + sp3)
  end
  
 #--------------------------------------------------------------------------
 # ● Update Animation
 #--------------------------------------------------------------------------      
  def update_animation
      super
      update_force_move_routine_move
  end 
    
 #--------------------------------------------------------------------------
 # ● Update Force Move Routine Move
 #--------------------------------------------------------------------------        
  def update_force_move_routine_move
      return if @force_action == ""
      return if @move_route == nil
      command = @move_route.list[@move_route_index]
      return if command == nil
      if command.code == ROUTE_PLAY_SE    
         params = command.parameters
         params[0].play 
         advance_move_route_index
      end   
  end
 
 #--------------------------------------------------------------------------
 # ● Update Routine Move
 #--------------------------------------------------------------------------      
 alias x_update_routine_move update_routine_move
 def update_routine_move
     return if @force_action_times > 0
     x_update_routine_move
 end
 
 #--------------------------------------------------------------------------
 # ● Can Cancel Move Type Custom
 #--------------------------------------------------------------------------    
  alias x_move_speed_process_move_command process_move_command
  def process_move_command(command)
      return if can_cancel_move_type_custom?(command)
      params = command.parameters
      x_move_speed_process_move_command(command)
      if command.code == ROUTE_CHANGE_SPEED and @battler != nil and 
         self.is_a?(Game_Event)
         @base_move_speed = params[0]
      end        
  end
  
 #--------------------------------------------------------------------------
 # ● Can Cancel Move Type Custom
 #--------------------------------------------------------------------------    
  def can_cancel_move_type_custom?(command)
      return true if command == nil
      return true if @force_action_times > 0
      return false
  end  
  
end  


#==============================================================================
# ■ Game_Event
#==============================================================================
class Game_Event < Game_Character  
  
 #--------------------------------------------------------------------------
 # ● Initialize
 #--------------------------------------------------------------------------              
 alias x_move_speed_event_initialize initialize
 def initialize(map_id, event)
     x_move_speed_event_initialize(map_id, event)
     refresh_move_speed 
 end  
 
  #--------------------------------------------------------------------------
  # ● Refresh Move Speed
  #--------------------------------------------------------------------------
  def refresh_move_speed
      return if @page == nil 
      @base_move_speed = @page.move_speed
  end 
 
 #--------------------------------------------------------------------------
 # ● Setup Page
 #--------------------------------------------------------------------------               
 alias x_move_speed_setup_page setup_page
 def setup_page(new_page)
     x_move_speed_setup_page(new_page)
     refresh_move_speed
 end
 
end


#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ BATTLER - STATES
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#==============================================================================
# ■ Game_Battler
#==============================================================================
class Game_Battler

  attr_accessor :state_move_speed
  attr_accessor :state_stop
  attr_accessor :state_loop_effect_time
  attr_accessor :state_loop_speed
  attr_accessor :state_duration 
  attr_accessor :state_string
  attr_accessor :state_string_time
  attr_accessor :state_stop 
  attr_accessor :state_slow 
  attr_accessor :state_sleep
  attr_accessor :state_invunerable
  attr_accessor :state_fast 
  attr_accessor :state_mute 
  attr_accessor :state_seal_attack 
  attr_accessor :state_seal_skill 
  attr_accessor :state_seal_item 
  attr_accessor :state_reflect
  
 #--------------------------------------------------------------------------
 # ● Initialize
 #--------------------------------------------------------------------------  
  alias x_state_initialize initialize
  def initialize
      @state_move_speed = 0
      @state_duration = []
      @state_loop_effect_time = []
      @state_loop_speed = []
      @state_string = ""
      @state_string_time = 0
      @state_stop = false
      @state_sleep = false
      @state_invunerable = false
      @state_slow = false 
      @state_fast = false 
      @state_mute = false 
      @state_seal_attack = false 
      @state_seal_skill = false 
      @state_seal_item = false
      @state_reflect = false
      x_state_initialize
  end
    
 #--------------------------------------------------------------------------
 # ● Add State
 #--------------------------------------------------------------------------    
  alias x_add_state add_state
  def add_state(state_id)
      unless @states.include?(state_id)
          state = $data_states[state_id] 
          xas_add_state(state)
      end        
      x_add_state(state_id)
  end 
  
 #--------------------------------------------------------------------------
 # ● Xas Add State
 #--------------------------------------------------------------------------      
  def xas_add_state(state)
      @state_duration[state.id] = 60 * $data_states[state.id].min_turns 
      @state_loop_effect_time[state.id] = 0 
      @state_loop_speed[state.id] = $data_states[state.id].max_turns 
      execute_damage_state(state,0)
  end      
 
 #--------------------------------------------------------------------------
 # ● Remove State
 #--------------------------------------------------------------------------        
  alias x_remove_state remove_state
  def remove_state(state_id)
      if state?(state_id)
         state = $data_states[state_id] 
         xas_remove_state(state)
      end  
      x_remove_state(state_id)      
  end    
    
 #--------------------------------------------------------------------------
 # ● XAS Remove State
 #--------------------------------------------------------------------------         
  def xas_remove_state(state)
      @state_duration.delete(state.id)  
      @state_loop_effect_time.delete(state.id)  
      @state_loop_speed.delete(state.id)
      execute_damage_state(state,1)
  end  

 #--------------------------------------------------------------------------
 # ● Execute_Damage_State
 #--------------------------------------------------------------------------           
  def execute_damage_state(state,type)
      return unless XAS_DAMAGE_POP::DAMAGE_STATE_POP
      return unless XAS_WORD::ENABLE_WORD
      return if state == nil or state.id == 1
      case type
         when 0
             damage = "+ " + state.name.to_s
         when 1  
             damage = "- " + state.name.to_s
      end
      @state_string = damage
      @state_string_time = 30             
  end  
  
end

#==============================================================================
# ■ Game_Character
#==============================================================================
class Game_Character < Game_CharacterBase
  
 #--------------------------------------------------------------------------
 # ● Update Battler States Effect
 #--------------------------------------------------------------------------    
 def update_battler_states_effect
     return unless XAS_SYSTEM::STATE_SYSTEM
     update_state_string_pop
     update_pre_state_setup
     return unless can_update_states_effect?
     for i in self.battler.states
         state = $data_states[i.id]  
         if state == nil or self.battler.state_duration[state.id] == nil or
            self.battler.state_loop_effect_time[state.id] == nil or
            self.battler.state_loop_speed[state.id] == nil
            self.battler.remove_state(state.id)
            next
            return
         end  
         update_state_abs_effects(state)
         update_state_loop(state)
         update_remove_state(state)
     end  
       
 end  
  
 #--------------------------------------------------------------------------
 # ● Update Pre State Setup
 #--------------------------------------------------------------------------       
 def update_pre_state_setup
     self.battler.state_stop = false
     self.battler.state_slow = false
     self.battler.state_fast = false
     self.battler.state_mute = false
     self.battler.state_sleep = false
     self.battler.state_invunerable = false
     self.battler.state_seal_attack = false
     self.battler.state_seal_skill = false
     self.battler.state_seal_item = false 
     self.battler.state_reflect = false
     self.battler.state_move_speed = 0
 end  
 
 #--------------------------------------------------------------------------
 # ● Update Pre State Setup
 #--------------------------------------------------------------------------        
 def update_state_abs_effects(state)
     if state.note =~ /<Stop>/
        self.battler.state_stop = true
     end
     if state.note =~ /<Slow>/
        self.battler.state_slow = true
        self.battler.state_move_speed = -1.5
     end   
     if state.note =~ /<Fast>/   
        self.battler.state_fast = true
        self.battler.state_move_speed = 1     
     end
     if self.battler.state_fast and
        self.battler.state_slow
        self.battler.state_move_speed = 0
     end
     if state.note =~ /<Mute>/   
        self.battler.state_mute = true
     end
     if state.note =~ /<Sleep>/  
        self.battler.state_sleep = true
     end
     if state.note =~ /<Invincible>/   
        self.battler.state_invunerable = true
     end  
     if state.note =~ /<Seal Attack>/   
        self.battler.state_seal_attack = true
     end 
     if state.note =~ /<Seal Skill>/   
        self.battler.state_seal_skill = true
     end       
     if state.note =~ /<Seal Item>/   
        self.battler.state_seal_item = true
      end
     if state.note =~ /<Reflect>/
        self.battler.state_reflect = true
     end         
 end
 
 #--------------------------------------------------------------------------
 # ● Update State Loop
 #--------------------------------------------------------------------------      
 def update_state_loop(state)
     self.battler.state_loop_effect_time[state.id] += 1
     if self.battler.state_loop_effect_time[state.id] > self.battler.state_loop_speed[state.id]
        self.battler.state_loop_effect_time[state.id] = 0
        if state.note =~ /<Animation ID = (\d+)>/
           state_anime = $1.to_i
           if state_anime != nil
              self.animation_id = state_anime
           end
        end    
        execute_states_effects(state)          
     end          
 end
 
 #--------------------------------------------------------------------------
 # ● Execute States Effect
 #--------------------------------------------------------------------------       
 def execute_states_effects(state)         
     if state.note =~ /<Slip Damage = (\S+)>/
        execute_state_slip_damage($1.to_i) 
     end  
 end
 
 #--------------------------------------------------------------------------
 # ● Execute States Slip Damage
 #--------------------------------------------------------------------------        
 def execute_state_slip_damage(damage)
     damage = 1 if damage == nil
     damage_slip = self.battler.mhp * damage / 100
     self.battler.hp -= damage_slip
     self.battler.damage = damage_slip
     self.battler.damage_pop = true
 end
 
 #--------------------------------------------------------------------------
 # ● Update Remove State
 #--------------------------------------------------------------------------       
 def update_remove_state(state)
     self.battler.state_duration[state.id] -= 1
     if self.battler.state_duration[state.id] <= 0     
        self.battler.remove_state(state.id) 
     end          
 end
 
 #--------------------------------------------------------------------------
 # ● Can Update States Effect
 #--------------------------------------------------------------------------      
  def can_update_states_effect?
      return false if self.dead?
      return false if self.battler.states == nil
      return false if self.battler.states.size == 0
      return false if self.battler.state_duration == []
      return true
  end

 #--------------------------------------------------------------------------
 # ● Update State String Pop
 #--------------------------------------------------------------------------       
  def update_state_string_pop
      return false if self.battler.state_string_time == 0
      self.battler.state_string_time -= 1
      if self.battler.state_string_time == 0
         self.battler.damage = self.battler.state_string
         self.battler.damage_pop = true
         self.battler.state_string = ""
      end  
  end  
end  

#==============================================================================
# ■ Game_Party
#==============================================================================
class Game_Party < Game_Unit

 #--------------------------------------------------------------------------
 # ● On Player Walk
 #--------------------------------------------------------------------------        
 alias x_state_on_player_walk on_player_walk
 def on_player_walk
     return if XAS_SYSTEM::STATE_SYSTEM
     x_state_on_player_walk
 end 
 
end 



#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ BATTLER - EVENT COMMANDS
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#===============================================================================
# ■ Game Event
#===============================================================================
class Game_Event < Game_Character
  
  #--------------------------------------------------------------------------
  # ● Shoot Chance
  #--------------------------------------------------------------------------            
  def shoot_chance(action_id,perc)
      return if self.battler == nil 
      if perc >= rand(100)
         shoot(action_id)
      end  
  end  
  
  #--------------------------------------------------------------------------
  # ● Guard
  #--------------------------------------------------------------------------          
  def guard(enable)
      return if self.battler == nil 
      self.battler.guard = enable
  end  
  
  #--------------------------------------------------------------------------
  # ● Touch Attack
  #--------------------------------------------------------------------------             
  def touch_attack(enable)
      return if self.battler == nil        
      return if seal_attack?(self.battler)
      @collision_attack = enable
      @pattern = 0
      @pattern_count  = 0      
  end
  
  #--------------------------------------------------------------------------
  # ● Counter
  #--------------------------------------------------------------------------             
  def counter(enable)
      return if self.battler == nil 
      self.battler.counter_action[2] = enable
  end    
 
  #--------------------------------------------------------------------------
  # ● Rand Shoot
  #--------------------------------------------------------------------------             
  def rand_shoot(random_id = [])
      return if self.battler == nil 
      return if random_id == []
      action_id = random_id[rand(random_id.size)]
      self.shoot(action_id)
  end      
  
end



#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ BATTLER - DEFEAT PROCESS
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

#===============================================================================
# ■ Scene Base
#===============================================================================
class Scene_Base  
  
  #--------------------------------------------------------------------------
  # ● Check Gameover
  #--------------------------------------------------------------------------              
  def check_gameover
      return unless $game_party.in_battle  
      SceneManager.goto(Scene_Gameover) if $game_party.all_dead?
  end
end  

#===============================================================================
# ■ Game Character
#===============================================================================
class Game_Character < Game_CharacterBase
  attr_accessor :collapse_duration
  attr_accessor :battler_visible
  attr_writer   :opacity
  
  #--------------------------------------------------------------------------
  # ● Initialize
  #--------------------------------------------------------------------------            
  alias x_collapse_initialize initialize
  def initialize
      @collapse_duration = 0
      x_collapse_initialize
  end  
  
end

#===============================================================================
# ■ XAS_BA_BATTLEEVENT_NONPREEMPT
#==============================================================================
module XAS_BA_BATTLEEVENT_NONPREEMPT
  
  #--------------------------------------------------------------------------
  # ● Update
  #--------------------------------------------------------------------------             
  def update
      return if self.battler != nil and $game_map.interpreter.running?
      super
  end
end

#===============================================================================
# ■ Game Event
#==============================================================================
class Game_Event < Game_Character
      include XAS_BA_BATTLEEVENT_NONPREEMPT
end

#===============================================================================
# ■ Game Character
#===============================================================================
class Game_Character < Game_CharacterBase

  #--------------------------------------------------------------------------
  # ● Update Battler Defeat Process
  #--------------------------------------------------------------------------      
   def update_battler_defeat_process
       execute_enemy_defeated_process if can_check_enemy_defeated?
       execute_actor_defeated_process if can_check_actor_defeated?
   end
   
  #--------------------------------------------------------------------------
  # ● Can Check Enemy Defeated?
  #--------------------------------------------------------------------------            
  def can_check_enemy_defeated?  
      return false if self.battler.is_a?(Game_Actor)
      return false if self.battler.defeated
      return true
  end     
  
  #--------------------------------------------------------------------------
  # ● Can Check Actor Defeated?
  #--------------------------------------------------------------------------              
  def can_check_actor_defeated?
      return false if self.battler.is_a?(Game_Enemy)
      return false if self.battler.defeated
      return false if $game_party.members[0].hp > 0
      return false if @collapse_duration > 0
      return true  
  end
  
  #--------------------------------------------------------------------------
  # ● Execute Actor Defeated Process
  #--------------------------------------------------------------------------                
  def execute_actor_defeated_process
      erase_actor_tools_on_map
      if $game_party.all_dead? and not self.battler.defeated
         self.battler.defeated = true
         self.collapse_duration = 120
         self.knock_back_duration = 161
         reset_battler_temp
      else   
         $game_temp.change_leader_wait_time = 0
         $game_player.change_leader
      end  
  end
  
  #--------------------------------------------------------------------------
  # ● Erase Tools on Map
  #--------------------------------------------------------------------------                  
  def erase_actor_tools_on_map
      for event in $game_map.events.values
          if event.tool_id > 0 and event.action.user.is_a?(Game_Player)
             event.erase
          end   
      end  
  end
  
  #--------------------------------------------------------------------------
  # ● Execute Enemy Defeaed Process
  #--------------------------------------------------------------------------         
   def execute_enemy_defeated_process
       self.battler.defeated = true
       self.through = true
       @knock_back_duration = 121
       enemy = $data_enemies[self.battler.enemy_id]
       @collapse_duration = 120
       execute_gain_exp_gold(enemy)  
       execute_active_switch(enemy)
       execute_defeated_animation(enemy)
       execute_defeated_sound_effect(enemy)
       execute_final_shoot(enemy)
   end    
 
  #--------------------------------------------------------------------------
  # ● Execute Defeated Sound Effect
  #--------------------------------------------------------------------------              
  def execute_defeated_sound_effect(enemy)
      return if self.battler.no_damage_pop
      Sound.play_enemy_collapse   
  end 
  
  #--------------------------------------------------------------------------
  # ● Execute Final Shoot
  #--------------------------------------------------------------------------             
  def execute_final_shoot(enemy)
      enemy.note  =~ /<Final Action ID = (\d+)>/ 
      action_id = $1.to_i
      return if action_id == nil
      self.shoot(action_id)      
  end  
  
  #--------------------------------------------------------------------------
  # ● Execute Gain Exp Gold
  #--------------------------------------------------------------------------           
  def execute_gain_exp_gold(enemy)  
      exp = self.battler.exp
      case XAS_BA::EXP_TYPE
         when 0
            actor = $game_party.members[0]
            actor.gain_exp(exp)
         when 1
            for i in 0...$game_party.members.size
               actor = $game_party.members[i]           
               actor.gain_exp(exp)
            end   
         when 2  
            exp = exp / $game_party.members.size 
            for i in 0...$game_party.members.size
               actor = $game_party.members[i]           
               actor.gain_exp(exp)
            end              
      end 
      $game_party.gain_gold(self.battler.gold)
  end  
  
  #--------------------------------------------------------------------------
  # ● Execute_Active Switch
  #--------------------------------------------------------------------------           
  def execute_active_switch(enemy)        
      enemy.note  =~ /<Active Switch = (\d+)>/      
      switch_id = $1.to_i  
      if switch_id != nil
         $game_switches[switch_id] = true
         $game_map.need_refresh = true     
      end
  end
  
  #--------------------------------------------------------------------------
  # ● Execute Defeated Animation
  #--------------------------------------------------------------------------             
  def execute_defeated_animation(enemy)
      enemy.note  =~ /<Defeated Animation = (\d+)>/      
      anime_id = $1.to_i      
      if anime_id != nil
         self.animation_id = anime_id
      end  
  end  
  
end   
 
#===============================================================================
# ■ Game Player
#=============================================================================== 
class Game_Player < Game_Character
  
  #--------------------------------------------------------------------------
  # ● Reset Old Level
  #--------------------------------------------------------------------------             
  def reset_old_level(trans = false)
     for actor in $game_party.members
         actor.old_level = actor.level
     end    
  end
  
  #--------------------------------------------------------------------------
  # ● Change Leader
  #--------------------------------------------------------------------------                  
  def change_leader
      return if $game_party.members.size <= 1
      reset_battler_temp
      current_leader_id = $game_party.members[0].id
      for i in 1..$game_party.members.size 
          pre_leader = $game_party.members[0].id
          $game_party.remove_actor(pre_leader) 
          $game_party.add_actor(pre_leader)  
          if $game_party.members[0].hp > 0
             execute_change_leader_effect unless current_leader_id == $game_party.members[0].id
             break 
          end
      end
  end   
  
  #--------------------------------------------------------------------------
  # ● Exeute Change leader Effect
  #--------------------------------------------------------------------------                    
  def execute_change_leader_effect
      actor = $game_party.members[0] 
      actor.invunerable_duration = XAS_BA::CHANGE_LEADER_WAIT_TIME
      actor.damage = nil
      actor.damage_pop = false
      actor.critical = false
      @knock_back_duration = nil
      if self.action != nil
         self.action.duration = 1
      end
      @force_action_times = 0
      @force_action_type = ""         
      reset_old_level(true)
      @x_pose_original_name = @character_name
      update_battler_pose
      $game_map.need_refresh = true
      self.animation_id = XAS_ANIMATION::CHANGE_LEADER_ANIMATION_ID
      $game_temp.change_leader_wait_time = XAS_BA::CHANGE_LEADER_WAIT_TIME  
  end
  
  #--------------------------------------------------------------------------
  # ● Check Actor Level
  #--------------------------------------------------------------------------           
  def check_actor_level
      return if $game_party.in_battle
      return if self.battler == nil
      return if self.battler.old_level == self.battler.level
      reset_old_level(false)
      if self.battler.level > 1
         Audio.se_play("Audio/SE/" + XAS_SOUND::LEVEL_UP , 100, 100) 
         if XAS_WORD::ENABLE_WORD 
            $game_player.battler.damage = XAS_WORD::LEVEL_UP
            $game_player.battler.damage_pop = true
         end
      end
      $game_player.need_refresh = true
  end 
end   

#===============================================================================
# ■ Game Party
#===============================================================================
class Game_Party < Game_Unit
  
 #--------------------------------------------------------------------------
 # ● Setup Starting Members  
 #--------------------------------------------------------------------------      
  alias x_old_level_setup_starting_members setup_starting_members  
  def setup_starting_members  
      x_old_level_setup_starting_members    
      for actor in $game_party.members
          actor.old_level = actor.level
      end
  end
  
end

#===============================================================================
# ■ Sprite Character
#==============================================================================
class Sprite_Character < Sprite_Base  
  
  #--------------------------------------------------------------------------
  # ● Update Collapse Effects
  #--------------------------------------------------------------------------            
  def update_collaspse_effects
      update_collapse_duration
      return unless can_collapse_effects?
      update_collpase_zoom_effects
      update_exp_gold_pop
  end
    
  #--------------------------------------------------------------------------
  # ● Can Collapse Effects
  #--------------------------------------------------------------------------              
  def can_collapse_effects?
      return false if @character.battler.is_a?(Game_Actor)
      return false unless @character.dead? 
      return false if @character.erased    
      return true
  end  
  
  #--------------------------------------------------------------------------
  # ● Update Exp Gold Pop
  #--------------------------------------------------------------------------              
  def update_exp_gold_pop
      return unless XAS_DAMAGE_POP::DAMAGE_EXP_GOLD_POP 
      exp_pop = @character.battler.exp
      gold_pop =@character.battler.gold
      case @character.collapse_duration
           when 110
                enemy = $data_enemies[@character.battler.enemy_id]
                @character.make_treasure(enemy)       
           when 80
             if exp_pop != 0
                word = XAS_WORD::EXP
                @character.battler.damage = word + " " + exp_pop.to_s
                @character.battler.damage_pop = true
                @character.battler.damage_type = "Exp"
             end  
           when 40
             if gold_pop != 0
                word = $data_system.currency_unit
                @character.battler.damage = word + " " + gold_pop.to_s
                @character.battler.damage_pop = true
                @character.battler.damage_type = "Gold"
             end               
      end      
  end
  
  #--------------------------------------------------------------------------
  # ● Update Collapse Duration
  #--------------------------------------------------------------------------              
  def update_collapse_duration
      @character.collapse_duration -= 1
      @character.opacity -= 2
      if @character.collapse_duration <= 0
         if @character.battler.is_a?(Game_Actor)
            SceneManager.goto(Scene_Gameover)
            return
         end
         self.visible = false
         @character.opacity = 0
         @character.erase
      end  
  end  

  #--------------------------------------------------------------------------
  # ● Update Collapse Zoom Effects
  #--------------------------------------------------------------------------                
  def update_collpase_zoom_effects
      case @character.battler.death_zoom_effect
          when 1
             @character.zoom_y += 0.05
             @character.zoom_x -= 0.01            
          when 2  
             @character.zoom_y -= 0.01
             @character.zoom_x += 0.03             
          when 3  
             @character.zoom_y += 0.03
             @character.zoom_x += 0.03              
          when 4   
             @character.zoom_y -= 0.005
             @character.zoom_x -= 0.005
          when 5   
            case @character.collapse_duration
                when 60..120
                 @character.zoom_y -= 0.01
                 @character.zoom_x += 0.06                             
                when 0..59  
                 @character.zoom_y += 0.2
                 @character.zoom_x -= 0.1 
             end
      end
  end  
  
end



#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ BATTLER - TREASURE
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#===============================================================================
# ■ XAS_BA_Item_Drop
#==============================================================================
module XAS_BA_ItemDrop
  
  #--------------------------------------------------------------------------
  # ● Defeat Process
  #--------------------------------------------------------------------------               
  def make_treasure(enemy)  
      treasure = nil      
      return unless $game_player.passable?(self.x,self.y,0)
      for di in enemy.drop_items
           next if di.kind == 0
           next if rand(di.denominator) != 0
           if di.kind == 1
              treasure = $data_items[di.data_id]
              tr_id = treasure.id
           elsif di.kind == 2
              treasure = $data_weapons[di.data_id]
              tr_id = treasure.id
           elsif di.kind == 3
              treasure = $data_armors[di.data_id]
              tr_id = treasure.id
           end
           break if treasure != nil 
       end   
       if treasure != nil
          command = RPG::MoveCommand.new
          command.code = 14
          command.parameters = [0,0]
          route = RPG::MoveRoute.new
          route.repeat = false
          route.list = [command, RPG::MoveCommand.new]         
          page = RPG::Event::Page.new
          page.move_type = 3
          page.move_route = route
          page.move_frequency = 6
          page.priority_type = 1
          page.trigger = 1
          page.through = true
          event = RPG::Event.new(self.x, self.y)
          event.pages = [page]       
          event = RPG::Event.new(self.x, self.y)
          token = Token_Event.new($game_map.map_id, event)
          token.icon_name = treasure.icon_index
          token.treasure = [di.kind,tr_id]
          token.treasure_time = 120 + XAS_BA::TREASURE_ERASE_TIME * 60
          token.jump_high(0,0,20)
          token.force_update = true
          token.move_speed = 6
          $game_map.add_token(token)
       end  
  end  
end

#===============================================================================
# ■ Game Event
#===============================================================================
class Game_Event < Game_Character
  include XAS_BA_ItemDrop
  
  #--------------------------------------------------------------------------
  # ● Update Treasure Duration
  #--------------------------------------------------------------------------               
  def update_treasure_duration
      return if @treasure_time == 0
      @treasure_time -= 1
      self.erase if @treasure_time == 0
  end
  
end

#===============================================================================
# ■ Game Character
#==============================================================================
class Game_Character < Game_CharacterBase
  attr_accessor :icon_name
  attr_accessor :treasure
end

#===============================================================================
# ■ Game Character
#==============================================================================
class Sprite_Character < Sprite_Base
  
  #--------------------------------------------------------------------------
  # ● Update
  #--------------------------------------------------------------------------             
  alias xrxs_charactericon_update update
  def update
      xrxs_charactericon_update
      if @character.icon_name != nil 
         self.bitmap = Cache.system("Iconset")
         self.src_rect.set(@character.icon_name  % 16 * 24, @character.icon_name / 16 * 24, 24, 24)
         self.ox = 12
         self.oy = 24
      end
  end
end

#===============================================================================
# ■ Game Player
#==============================================================================
class Game_Player < Game_Character
  
  #--------------------------------------------------------------------------
  # ● Check Event Trigger Here
  #--------------------------------------------------------------------------               
  alias treasure_check_event_trigger_here check_event_trigger_here
  def check_event_trigger_here(triggers)
      return false if $game_map.interpreter.running?
      check_treasure_here         
      treasure_check_event_trigger_here(triggers)
  end  
 
  #--------------------------------------------------------------------------
  # ● check_treasure_here   
  #--------------------------------------------------------------------------                 
  def check_treasure_here   
     for event in $game_map.events_xy(@x, @y)
         if event.treasure != nil 
            name_pop = true
            case event.treasure[0]            
            when 1
                  item = $data_items[event.treasure[1]]
                  if can_execute_field_item_effect?(item)
                     name_pop = false
                  else  
                     $game_party.gain_item(item, 1)
                  end
                  $game_map.need_refresh = true
            when 2  
                  item = $data_weapons[event.treasure[1]]
                  $game_party.gain_item($data_weapons[event.treasure[1]], 1,false)
            when 3
                  item = $data_armors[event.treasure[1]]
                  $game_party.gain_item(item, 1,false)
            end
            Audio.se_play("Audio/SE/" + XAS_SOUND::ITEM_DROP , 100, 100)   
            event.erase
            if item != nil
                if item.note =~ /<Drop Animation = (\d+)>/
                   self.animation_id = $1.to_i
                end
                if XAS_DAMAGE_POP::DAMAGE_ITEM_POP and name_pop
                   self.battler.damage = item.name.to_s
                   self.battler.damage_pop = true
                   self.battler.damage_type = "Item"
                end                       
            end
          end            
     end   
 end           
     
  #--------------------------------------------------------------------------
  # ● Can Execute Field Item Effect
  #--------------------------------------------------------------------------                  
  def can_execute_field_item_effect?(item)
      if item.note =~ /<Drop HP Damage = (\S+)>/
         damage = $1.to_i
         damage2 = damage * self.battler.mhp / 100
         self.battler.damage = damage2
         self.battler.damage_pop = true
         self.battler.hp -= damage2
         return true
      end  
      if item.note =~ /<Drop MP Damage = (\S+)>/
         damage = $1.to_i
         damage2 = damage * self.battler.mmp / 100
         self.battler.mp -= damage2         
         self.battler.damage_type = "Mp"   
         self.battler.damage = damage2
         self.battler.damage_pop = true
         return true
      end       
      if item.note =~ /<Drop Gold = (\d+)>/
         gold = $1.to_i
         damage = $data_system.terms.gold + " " + gold.to_s
         self.battler.damage = damage
         self.battler.damage_pop = true
         $game_party.gain_gold(gold)
         return true
      end
      return false  
  end  
end 



#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ SPRITE - POSE (Character Name)
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#===============================================================================
# ■ Game_Character
#===============================================================================
class Game_Character < Game_CharacterBase
  
  attr_accessor :x_pose_duration
  attr_accessor :x_pose_name
  attr_accessor :x_pose_original_name
  attr_accessor :character_name
  
  #-----------------------------------------------------------------------------
  # ● Initialize
  #-----------------------------------------------------------------------------  
  alias x_pose_initialize initialize
  def initialize
      x_pose_initialize
      @x_pose_duration = 0
      @x_pose_name = ""
      @x_pose_original_name = @character_name
  end

  #-----------------------------------------------------------------------------
  # ● Update
  #-----------------------------------------------------------------------------    
  def make_pose(sufix, pose_duration)
      return if @x_pose_original_name == ""
      @x_pose_name = sufix
      @x_pose_duration = pose_duration         
  end     
  
  #-----------------------------------------------------------------------------
  # ● Update Pose
  #-----------------------------------------------------------------------------    
  def update_battler_pose
      return false unless XAS_SYSTEM::CHARACTER_POSE_NAME
      if @x_pose_duration == 0
         @x_pose_original_name = @character_name
         return
      else     
         @x_pose_duration -= 1
         @character_name = @x_pose_original_name + @x_pose_name
         if @x_pose_duration == 0
            @character_name = @x_pose_original_name
            @x_pose_name = ""
         end
      end
      unless jumping? 
         @jump_count = 0
         @jump_peak = 0
      end       
  end
  
  #-----------------------------------------------------------------------------
  # ● Set Graphic
  #-----------------------------------------------------------------------------      
  alias x_pose_set_graphic set_graphic
  def set_graphic(character_name, character_index)
      x_pose_set_graphic(character_name, character_index)
      @x_pose_original_name = @character_name
      @x_pose_duration = 0
      @x_pose_name = ""      
  end    
  
end


#===============================================================================
# ■ Game_Interpreter
#===============================================================================
class Game_Interpreter
  
  #-----------------------------------------------------------------------------
  # ● Command_322
  #-----------------------------------------------------------------------------    
  alias x_pose_command_322 command_322
  def command_322
      x_pose_command_322
      actor = $game_actors[@params[0]]
      if actor != nil
         $game_player.x_pose_duration = 0
         $game_player.x_pose_original_name =  @params[1]
      end
  end
  
end  

#===============================================================================
# ■ RPG_FileTest 
#===============================================================================
module RPG_FileTest
  
  #--------------------------------------------------------------------------
  # ● RPG_FileTest.character_exist?
  #--------------------------------------------------------------------------
  def RPG_FileTest.character_exist?(filename)
      return Cache.character(filename) rescue return false
  end

  #--------------------------------------------------------------------------
  # ● RPG_FileTest.system_exist?
  #--------------------------------------------------------------------------
  def RPG_FileTest.system_exist?(filename)
      return Cache.system(filename) rescue return false
  end  
  
end

#===============================================================================
# ■ Sprite_Character
#===============================================================================
class Sprite_Character < Sprite_Base
  
  #--------------------------------------------------------------------------
  # ● X Pose Update
  #--------------------------------------------------------------------------  
  alias x_pose_update_bitmap update_bitmap
  def update_bitmap
      check_file_exist
      x_pose_update_bitmap
  end
 
 #--------------------------------------------------------------------------
 # ● Check File Exist
 #--------------------------------------------------------------------------  
 def check_file_exist
     return if @character_name == @character.character_name
     unless RPG_FileTest.character_exist?(@character.character_name)
            @character.character_name = @character.x_pose_original_name    
            @character.x_pose_duration = 0
            @character.x_pose_name = ""
     end         
 end  
  
end





#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ SPRITE - DAMAGE SPRITE
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#===============================================================================
# ■  XRXS_DAMAGE_OFFSET
#===============================================================================
module XRXS_DAMAGE_OFFSET
  
  #--------------------------------------------------------------------------
  # ● Update
  #--------------------------------------------------------------------------              
  def update
      super
      @damage_sprites   = [] if @damage_sprites.nil?
      for damage_sprite in @damage_sprites
          damage_sprite.x = self.x
          damage_sprite.y = self.y
      end
  end
end

#===============================================================================
# ■ Sprite_Character
#===============================================================================
class Sprite_Character < Sprite_Base
      include XRXS_DAMAGE_OFFSET
end


#==============================================================================
# ■ Sprite Base
#==============================================================================
class Sprite_Base < Sprite
  include XAS_DAMAGE_POP
  #--------------------------------------------------------------------------
  # ● Initialize
  #--------------------------------------------------------------------------   
  alias x_damage_pop_initialize initialize
  def initialize(viewport = nil)      
      @_damage_duration = 0
      x_damage_pop_initialize(viewport) 
  end
  
  #--------------------------------------------------------------------------
  # ● Damage
  #--------------------------------------------------------------------------     
  def damage(value, type = "")
      dispose_damage
      @damage_ox = 0
      @damage_type = type
      # NUMBER PICTURE
      if value.is_a?(Numeric) 
         bitmap_number_image = Cache.system("XAS_Damage_Number")
         bitmap_im_cw = bitmap_number_image.width / 10
         bitmap_im_ch = bitmap_number_image.height / 5           
         bitmap = Bitmap.new(bitmap_number_image.width,(bitmap_im_ch * 2) + 5)
         bitmap_number_text = value.to_s.split(//)
         center_x = (((2 + bitmap_number_text.size) * bitmap_im_cw) / 2)
         # Damage Color         
         if value >= 0
            if @damage_type == "Critical"
               h = bitmap_im_ch * 2  
               h2 = bitmap_im_ch * 4
               $game_map.screen.start_shake(5, 5, 60)
            elsif @damage_type == "Mp"   
               h = bitmap_im_ch * 0  
               h2 = bitmap_im_ch * 3
            else
               h = 0
            end
            f = 0
          else # Recover Color   
            h = bitmap_im_ch  
            h2 = bitmap_im_ch * 3 if @damage_type == "Mp"     
            f = 1
        end   
        for r in f..bitmap_number_text.size - 1
            bitmap_number_abs = bitmap_number_text[r].to_i
            bitmap_src_rect = Rect.new(bitmap_im_cw * bitmap_number_abs, h, bitmap_im_cw, bitmap_im_ch)
            bitmap.blt(center_x + (bitmap_im_cw  *  r), bitmap_im_ch + 5, bitmap_number_image, bitmap_src_rect)                  
        end 
        ex = (bitmap_im_cw / 2) * (bitmap_number_text.size + f)
        @damage_ox = (bitmap_number_image.width - (bitmap_number_image.width / 2) - ex) - center_x 
        # Add Extra String (MP / Critical)
        if h2 != nil
           string_x = (center_x - (bitmap_number_image.width / 2) + (bitmap_im_cw / 2) * bitmap_number_text.size)
           bitmap_src_rect = Rect.new(0, h2,  bitmap_number_image.width, bitmap_im_ch)
           bitmap.blt(string_x , 0, bitmap_number_image, bitmap_src_rect)   
        end        
        bitmap_number_image.dispose  
      else 
          #TEXT STRING
          damage_string = value.to_s
          bitmap = Bitmap.new(160, 48)
          bitmap.font.name = DAMAGE_FONT_NAME
          bitmap.font.size = DAMAGE_FONT_SIZE
          bitmap.font.bold = DAMAGE_FONT_BOLD
          bitmap.font.italic = DAMAGE_FONT_ITALIC
          bitmap.font.color = Color.new(0,0,0)
          bitmap.draw_text(0, 12, 160, 36, damage_string, 1)
          case @damage_type
               when "Exp";   string_color = DAMAGE_EXP_FONT_COLOR
               when "Gold";  string_color = DAMAGE_GOLD_FONT_COLOR
               when "Item";  string_color = DAMAGE_ITEM_FONT_COLOR
          else
             string_color = DAMAGE_DEFAULT_FONT_COLOR
          end
          bitmap.font.color = string_color
          bitmap.draw_text(0, 12, 160, 36, damage_string, 1)              
      end 
       @_damage_sprite = ::Sprite.new(self.viewport)
       @_damage_sprite.bitmap = bitmap
       @_damage_sprite.ox = 80
       @_damage_sprite.oy = 20
       @_damage_sprite.x = self.x + @damage_ox
       @_damage_sprite.y = self.y - self.oy / 2
       @_damage_sprite.z = 3000
       @_damage_duration = 60
   end

  #--------------------------------------------------------------------------
  # ● Dispose Damage
  #--------------------------------------------------------------------------       
  def dispose_damage
      if @_damage_sprite != nil
         @_damage_sprite.bitmap.dispose
         @_damage_sprite.dispose
         @_damage_sprite = nil
         @_damage_duration = 0
      end
  end
  
  #--------------------------------------------------------------------------
  # ● Dispose
  #--------------------------------------------------------------------------         
  alias x_damage_dispose dispose
  def dispose 
      dispose_damage
      x_damage_dispose
  end
  
  #--------------------------------------------------------------------------
  # ● Update
  #--------------------------------------------------------------------------           
  alias x_damage_pop_update update
  def update
      if @_damage_duration > 0
         @_damage_duration -= 1
         if @_damage_duration == 0
            dispose_damage
         end
       end      
       x_damage_pop_update
  end    
    
end  

#===============================================================================
# ■ XRXS DAMAGE
#===============================================================================
module XRXS_DAMAGE
  
  #--------------------------------------------------------------------------
  # ● Damage X Init Velocity
  #--------------------------------------------------------------------------                             
  def damage_x_init_velocity
      return 0.2 * (rand(5) - 2) 
  end
    
  #--------------------------------------------------------------------------
  # ● Damage Y Init Velocity
  #--------------------------------------------------------------------------                             
  def damage_y_init_velocity
      return 9
  end
    
  #--------------------------------------------------------------------------
  # ● Update
  #--------------------------------------------------------------------------                               
  def update
    super
    @damage_sprites   = [] if @damage_sprites.nil?
    @damage_durations = [] if @damage_durations.nil?
    if @_damage_sprite != nil and @_damage_sprite.visible
       if @damage_ox != nil
          dam_ox = @damage_ox
       else   
          dam_ox = 0
       end        
       if @damage_type != nil
          dam_type = @damage_type
       end  
       x = damage_x_init_velocity
       y = damage_y_init_velocity
       d = @_damage_duration
       @damage_sprites.push(Sprite_Damage.new(@_damage_sprite, x, y, d,dam_ox,dam_type))
       @_damage_sprite.visible = false
    end
    for damage_sprite in @damage_sprites
        damage_sprite.update
    end
    for i in 0...@damage_sprites.size
        @damage_sprites[i] = nil if @damage_sprites[i].disposed?
    end
    @damage_sprites.compact!
  end
  def dispose
    super
    if @damage_sprites != nil
       for damage_sprite in @damage_sprites
           damage_sprite.dispose
       end
     end
  end
end

#===============================================================================
# ■ RPG Sprite
#===============================================================================
class Sprite_Base < Sprite
      include XRXS_DAMAGE
end

#===============================================================================
# ■ Sprite Damage
#===============================================================================
class Sprite_Damage < Sprite
  
  #--------------------------------------------------------------------------
  # ● Initialize
  #--------------------------------------------------------------------------                        
  def initialize(sprite, init_x_speed, init_y_speed, duration,dam_ox,dam_type = nil)
      super(nil)
      self.bitmap = sprite.bitmap.dup unless sprite.bitmap.nil?
      self.opacity = sprite.opacity
      self.x = sprite.x
      self.y = sprite.y
      self.z = sprite.z
      self.ox = sprite.ox - dam_ox
      self.oy = sprite.oy
      @now_x_speed = init_x_speed
      @now_y_speed = init_y_speed
      @potential_x_energy = 0.0
      @potential_y_energy = 0.0
      @duration = duration
      @dam_type = dam_type
      @dam_type = "" if dam_type == nil
  end

  #--------------------------------------------------------------------------
  # ● Update    
  #--------------------------------------------------------------------------                       
  def update
    super
    if XAS_DAMAGE_POP::DAMAGE_CRITICAL_ZOOM
       if @dam_type != "Critical"
          update_normal_popup
       else  
          update_critical_effect   
       end      
    else      
       update_normal_popup
    end
    @duration -= 1
    if @duration == 0
       self.dispose
    end
  end
  
  #--------------------------------------------------------------------------
  # ● update_critical_effect
  #--------------------------------------------------------------------------                           
  def update_critical_effect  
      case @duration
         when 40..60
           self.zoom_x += 0.1
           self.zoom_y += 0.1
         else   
           if self.zoom_x > 0.1   
              self.zoom_x -= 0.1
              self.zoom_y -= 0.1
           end
       end
  end
  
  #--------------------------------------------------------------------------
  # ● update_normal_popup
  #--------------------------------------------------------------------------                         
  def update_normal_popup
      self.opacity -= 25 if @duration <= 10
      n = self.oy + @now_y_speed
      if n <= 0
         @now_y_speed *= -1
         @now_y_speed /=  2
         @now_x_speed /=  2
      end
      self.oy  = [n, 0].max    
      @potential_y_energy += 0.58
      speed = @potential_y_energy.floor
      @now_y_speed        -= speed
      @potential_y_energy -= speed
      @potential_x_energy += @now_x_speed
      speed = @potential_x_energy.floor
      self.ox             += speed
      @potential_x_energy -= speed  
    end
 
end



#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ SPRITE - SPRITE EFFECTS
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#==============================================================================
# ■ Sprite Base 
#==============================================================================
class Sprite_Base < Sprite  

  #--------------------------------------------------------------------------
  # ● Animation Set Sprite
  #--------------------------------------------------------------------------
  def animation_set_sprites(frame)
      cell_data = frame.cell_data
      @ani_sprites.each_with_index do |sprite, i|
        next unless sprite
        pattern = cell_data[i, 0]
        if !pattern || pattern < 0
            sprite.visible = false
            next
        end
        sprite.bitmap = pattern < 100 ? @ani_bitmap1 : @ani_bitmap2
        sprite.visible = true
        sprite.src_rect.set(pattern % 5 * 192,
        pattern % 100 / 5 * 192, 192, 192)
        if @ani_mirror
           cx = cell_data[i, 1]
           sprite.angle = (360 - cell_data[i, 4])
           sprite.mirror = (cell_data[i, 5] == 0)
        else
           cx = cell_data[i, 1]
           sprite.angle = cell_data[i, 4]
           sprite.mirror = (cell_data[i, 5] == 1)
        end
        cy = cell_data[i, 2]
        sprite.z = self.z + 300 + i
        sprite.ox = 96
        sprite.oy = 96
        sprite.zoom_x = cell_data[i, 3] / 100.0
        sprite.zoom_y = cell_data[i, 3] / 100.0
        sprite.opacity = cell_data[i, 6] * self.opacity / 255.0
        sprite.blend_type = cell_data[i, 7]
        case @animation.position 
              when 0
                  sprite.x = self.x + cx
                  sprite.y = self.y + cy - (height / 2)          
              when 1
                  sprite.x = self.x + cx
                  sprite.y = self.y + cy         
              when 2
                  sprite.x = self.x + cx
                  sprite.y = self.y + cy + (height / 2) 
              when 3  
                  sprite.x  = (544 / 2) + cx
                  sprite.y  = (416 / 2) + cy     
        end        
        
        
    end
  end  
  
  #--------------------------------------------------------------------------
  # ● Dispose Animation
  #--------------------------------------------------------------------------
  def dispose_animation
      $game_temp.animation_garbage = [] if $game_temp.animation_garbage == nil
      if @ani_bitmap1
         @@_reference_count[@ani_bitmap1] -= 1
        if @@_reference_count[@ani_bitmap1] == 0
            $game_temp.animation_garbage.push(@ani_bitmap1)
         end
      end
      if @ani_bitmap2
         @@_reference_count[@ani_bitmap2] -= 1
         if @@_reference_count[@ani_bitmap2] == 0
            $game_temp.animation_garbage.push(@ani_bitmap2)
        end
     end
     if @ani_sprites
        @ani_sprites.each {|sprite| sprite.dispose }
        @ani_sprites = nil
        @animation = nil
     end
     @ani_bitmap1 = nil
     @ani_bitmap2 = nil
  end    
  
end

#==============================================================================
# ■ Scene_Base
#==============================================================================
class Game_Map
    
  #--------------------------------------------------------------------------
  # ● Setup
  #--------------------------------------------------------------------------    
  alias animation_garbage_setup setup
  def setup(map_id)
      animation_garbage_setup(map_id)
      dispose_animation_garbage
  end
  
  #--------------------------------------------------------------------------
  # ● Dispose Animation Garbage
  #--------------------------------------------------------------------------  
  def dispose_animation_garbage
      return if $game_temp.animation_garbage == nil
      for animation in $game_temp.animation_garbage
          animation.dispose 
      end  
      $game_temp.animation_garbage = nil
  end  
  
end  

#==============================================================================
# ■ Scene_Base
#==============================================================================
class Scene_Base
  
  #--------------------------------------------------------------------------
  # ● Scene Changing?
  #--------------------------------------------------------------------------    
  alias animation_garbage_scene_changing scene_changing? 
  def scene_changing?
      $game_map.dispose_animation_garbage if SceneManager.scene != self
      animation_garbage_scene_changing
  end

end  

#===============================================================================
# ■ Sprite_Character
#===============================================================================
class Sprite_Character < Sprite_Base
  include XAS_SYSTEM
  
  #--------------------------------------------------------------------------
  # ● Setup New Effect
  #--------------------------------------------------------------------------              
  def setup_new_effect
      if @character.animation_id > 0
         animation = $data_animations[@character.animation_id]
         start_animation(animation)
         @character.animation_id = 0
      end
      if !@balloon_sprite && @character.balloon_id > 0
         @balloon_id = @character.balloon_id
         start_balloon
      end
  end  
  
  #--------------------------------------------------------------------------
  # ● Can Update X Effects
  #--------------------------------------------------------------------------                    
  def can_update_x_effects?
      return false unless CHARACTER_SPRITE_EFFECTS
      return false if @character.erased
      return false if @character.transparent == true
      return true
  end  
  #--------------------------------------------------------------------------
  # ● Can Damage Pop Base
  #--------------------------------------------------------------------------                  
  def can_damage_pop_base?
      return false unless $game_system.xas_battle
      return false if XAS_SYSTEM::DAMAGE_POP == false 
      return false if @character.battler == nil
      return false if @character.battler.no_damage_pop  
      return false if @character.battler.damage_pop != true
      return true  
  end  
  
  
  #--------------------------------------------------------------------------
  # ● Execute Damage Pop
  #--------------------------------------------------------------------------              
  def execute_damage_pop  
      damage(@character.battler.damage, @character.battler.damage_type)
      @character.battler.damage = nil
      @character.battler.critical = false
      @character.battler.damage_pop = false
      @character.battler.damage_type = ""
  end
    
  #--------------------------------------------------------------------------
  # ● Update X Effects
  #--------------------------------------------------------------------------              
  def update_x_effects
      update_collaspse_effects if @character.collapse_duration > 0
      update_sprite_position
      update_angle
      update_zoom
  end
    
  #--------------------------------------------------------------------------
  # ● Update Angle
  #--------------------------------------------------------------------------          
  def update_angle
      return if @character.angle == self.angle
      self.angle = @character.angle
  end
  
  #--------------------------------------------------------------------------
  # ● Update Zoom 
  #--------------------------------------------------------------------------            
  def update_zoom
      update_treasure_effect
      update_breath_effect if can_breath_effect?
      self.zoom_x = @character.zoom_x
      self.zoom_y = @character.zoom_y
  end
  
  #--------------------------------------------------------------------------
  # ● Update Treasure_effect
  #--------------------------------------------------------------------------                      
  def update_treasure_effect
      return if @character.treasure_time == 0
      update_treasure_fade_effect
      update_treasure_float_effect
  end  
  
  #--------------------------------------------------------------------------
  # ● update_treasure_fade_effect
  #--------------------------------------------------------------------------                        
  def update_treasure_fade_effect
      return unless XAS_BA::FADE_TREASURE_SPRITE 
      return if @character.treasure_time > 100
      return if @character.zoom_x < 0.01      
      @character.zoom_x -= 0.01
      if @character.temp_id > 0
         @character.zoom_x = 1.00
         @character.treasure_time = 120 + XAS_BA::TREASURE_ERASE_TIME * 60
      end
  end  
  
  #--------------------------------------------------------------------------
  # ● Update Treasure Float Effect
  #--------------------------------------------------------------------------                          
  def update_treasure_float_effect
      return unless XAS_BA::FLOAT_TREASURE_SPRITE    
      return if self.character.jumping?
      self.character.treasure_float[2] += 1
      if self.character.treasure_float[2] > 1
         self.character.treasure_float[2] = 0
         self.character.treasure_float[1] += 1
         case self.character.treasure_float[1]
            when 1..15 
              self.character.treasure_float[0] -= 1
            when 16..30
              self.character.treasure_float[0] += 1
            else
              self.character.treasure_float[0] = 0
              self.character.treasure_float[1] = 0 
          end 
      end   
      self.y +=  self.character.treasure_float[0]
  end
  
  #--------------------------------------------------------------------------
  # ● Can Breath Effect?
  #--------------------------------------------------------------------------                    
  def can_breath_effect?
      return false if @character.battler == nil
      return false if @character.battler.breath_effect == false
      return false if @character.battler.hp == 0
      return false if @character.stop and not @character.battler.state_sleep
      return true
  end  
  
  #--------------------------------------------------------------------------
  # ● Update Breath Effect
  #--------------------------------------------------------------------------                  
  def update_breath_effect 
      if @character.battler.fast_breath_effect
          zoom_speed = 3
          zoom_power_x = 0.006    
          zoom_power_y = 0.006        
      else
          zoom_speed = 1
          zoom_power_x = 0    
          zoom_power_y = 0.002
      end
      @character.battler.breath_duration += zoom_speed 
      case @character.battler.breath_duration 
           when 1..30
                @character.zoom_x += zoom_power_x
                @character.zoom_y += zoom_power_y
           when 31..60
                @character.zoom_x -= zoom_power_x
                @character.zoom_y -= zoom_power_y
           else  
                @character.battler.breath_duration = 0
                @character.zoom_x = 1.00
                @character.zoom_y = 1.00
      end   
  end  
  
  #--------------------------------------------------------------------------
  # ● Update Sprite Position
  #--------------------------------------------------------------------------                  
  alias x_set_character_bitmap set_character_bitmap
  def set_character_bitmap
      @py = nil
      x_set_character_bitmap
      if @character_name[/\((\d+)\)/]
         @py = $1.to_i 
      end            
  end
  
  #--------------------------------------------------------------------------
  # ● Update Sprite Position
  #--------------------------------------------------------------------------                
  def update_sprite_position
      if @character.tool_id > 0
         if @character.tool_effect == "Barrier"
            unless @character.action == nil
               bullet_user = @character.action.user
               self.x = bullet_user.screen_x
               self.y = bullet_user.screen_y
               @character.x = bullet_user.x
               @character.y = bullet_user.y
               @character.direction = bullet_user.direction
            end
         end  
      end  
      update_hold_target       
      if @py != nil
         self.y += @py
      end
      if @character.angle == 315 and @cw != nil
         self.x -= (@cw / 3)
         self.y -= (@ch / 6)
      end  
      if XAS_BA::KNOCKBACKING_SHAKE 
         if self.character.knockbacking?
            self.x = self.x + rand(5) unless self.character.dead?
         end  
      end       
 end  
 
 #--------------------------------------------------------------------------
 # ● Update X Effects
 #--------------------------------------------------------------------------                 
 def update_hold_target
     return if @character.temp_id == 0
     target = $game_map.events[@character.temp_id]
     if target == nil or target.erased
        @character.temp_id = 0
        @character.move_speed = @character.pre_move_speed
        check_character_above_player(target)
     else
        self.x = target.screen_x
        self.y = target.screen_y
        self.character.x = target.x
        self.character.y = target.y
        self.character.move_speed = target.move_speed
        self.character.direction = target.direction unless self.character.direction_fix
        check_character_above_player(target)
     end   
 end
 
 #--------------------------------------------------------------------------
 # ● Check Chacracter Above Player
 #--------------------------------------------------------------------------                  
 def check_character_above_player(target)
     return if @character.is_a?(Game_Player)
     return if @character.battler == nil
     if (@character.x == $game_player.x and
         @character.y == $game_player.y) or
          not @character.passable_temp_id?(@character.x,@character.y)
         @character.temp_id = 0
         @character.move_speed = @character.pre_move_speed 
         case @character.direction
            when 2;  @character.y -= 1
            when 4;  @character.x += 1
            when 6;  @character.x -= 1
            when 8;  @character.y += 1  
         end
     end   
   end
  
 #--------------------------------------------------------------------------
 # ● Update_balloon
 #--------------------------------------------------------------------------
 if XAS_BA::FIX_BALLOON_POSITION
 def update_balloon
     if @balloon_duration > 0
        @balloon_duration -= 1
        if @balloon_duration > 0
           @balloon_sprite.x = x
           @balloon_sprite.y = y - XAS_BA::BALLOON_HEIGHT
           @balloon_sprite.z = z + 200
           sx = balloon_frame_index * 32
           sy = (@balloon_id - 1) * 32
           @balloon_sprite.src_rect.set(sx, sy, 32, 32)
      else
           end_balloon
      end
    end
  end   
  end

end

#==============================================================================
# ■ Game_Event
#==============================================================================
class Game_Event < Game_Character

  #--------------------------------------------------------------------------
  # ● Near The Screen
  #--------------------------------------------------------------------------  
  alias x_near_the_screen near_the_screen?
  def near_the_screen?(dx = 12, dy = 8)
      return true if can_update_out_screen?
      x_near_the_screen(dx, dy)
  end
  
 #--------------------------------------------------------------------------
 # ● Can Update Out Screen
 #-------------------------------------------------------------------------- 
 def can_update_out_screen?
     return true if self.force_update
     return false
 end
   
end

#==============================================================================
# ■ Spriteset Map
#==============================================================================
class Spriteset_Map
  
  #--------------------------------------------------------------------------
  # ● Can Refresh Hud
  #--------------------------------------------------------------------------    
  alias x_pre_leader_id_initialize initialize
  def initialize
      if $game_party.members[0] != nil
         $game_system.pre_leader_id = $game_party.members[0].actor_id 
      else   
         $game_system.pre_leader_id = nil
      end  
      x_pre_leader_id_initialize
  end  
  
  #--------------------------------------------------------------------------
  # ● Can Refresh Hud
  #--------------------------------------------------------------------------    
  def can_refresh_hud?
      if $game_party.members[0] == nil
         return true if $game_system.pre_leader_id != nil
      elsif $game_party.members[0] != nil   
         return true if $game_system.pre_leader_id == nil
         return true if $game_system.pre_leader_id != $game_party.members[0].actor_id 
      end  
      return false
  end  
  
  #--------------------------------------------------------------------------
  # ● update
  #--------------------------------------------------------------------------    
  def refresh_hud
      $game_system.pre_leader_id = $game_party.members[0].actor_id      
  end
  
  #--------------------------------------------------------------------------
  # ● Update Hud Visible
  #--------------------------------------------------------------------------      
  def update_hud_visible
      if hud_visible?
         $game_system.enable_hud = true
      else   
         $game_system.enable_hud = false
      end  
  end  
    
  #--------------------------------------------------------------------------
  # ● Hud Visible?
  #--------------------------------------------------------------------------        
  def hud_visible?
      return false if $game_system.hud_visible == false 
      return false if $game_message.visible
      return true
  end     
  
end  



#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ MISC - SCENE TARGET SELECT 
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


#==============================================================================
# ■ Game_Temp
#==============================================================================
class Game_Temp
      attr_accessor :xas_target_x 
      attr_accessor :xas_target_y
      attr_accessor :xas_target_time
      attr_accessor :xas_target_shoot_id
      
#--------------------------------------------------------------------------
# ● Initialize 
#--------------------------------------------------------------------------
  alias xas_target_initialize initialize
  def initialize
      xas_target_initialize
      @xas_target_x = 0
      @xas_target_y = 0
      @xas_target_time = 0
      @xas_target_shoot_id = 0
  end    
        
end

#==============================================================================
# ■ Game_Map
#==============================================================================
class Game_Map

 attr_accessor :pre_display_x
 attr_accessor :pre_display_y
 attr_accessor :pre_real_display_x
 attr_accessor :pre_real_display_y
 
 #--------------------------------------------------------------------------
 # * Object Initialization
 #--------------------------------------------------------------------------
 alias x_map_initialize initialize
 def initialize  
     x_map_initialize
     @pre_display_x = @display_x - 1
     @pre_display_y = @display_y - 1    
 end
 
  #--------------------------------------------------------------------------
  # ● Screen Scrolled?
  #--------------------------------------------------------------------------        
  def screen_scrolled?
      if @pre_display_x != @display_x or
         @pre_display_y != @display_y
         @pre_display_x = @display_x
         @pre_display_y = @display_y
         return true
      end   
      return false
  end
 
 #--------------------------------------------------------------------------
 # ● Event On Screen
 #--------------------------------------------------------------------------
 def event_on_screen?(event)
     event.target = false
     px = ($game_map.display_x).truncate 
     py = ($game_map.display_y).truncate    
     distance_x = event.x - px
     distance_y = event.y - py
     if distance_x.between?(0, 16) and
        distance_y.between?(0, 12)
        event.target = true
     end  
 end      
  
 #--------------------------------------------------------------------------
 # ● Check Event on Screen
 #-------------------------------------------------------------------------- 
 def check_events_on_screen
      for i in $game_map.events.values 
            event_on_screen?(i)
      end   
  end 
  
end  
#==============================================================================
# ■ Scene Target Select
#==============================================================================
class Scene_Target_Select
  
  #--------------------------------------------------------------------------
  # ● Main
  #--------------------------------------------------------------------------        
  def main     
      $game_temp.xas_target_x = 0
      $game_temp.xas_target_y = 0      
      $game_temp.xas_target_time = 0
      @new_x = $game_player.screen_x
      @new_y = $game_player.screen_y
      @index_max = -1
      @target_index = 0  
      @spriteset = Spriteset_Map.new 
      @text_string = ""
      @fy = 0
      @fy_time = 0
      for event in $game_map.events.values
        if event.target and event.battler?
           @index_max += 1 
        end  
      end  
      Sound.play_equip
      if @index_max == -1
         cancel_select 
      else
         create_layout
         create_layout_skill
         create_cusrsor
         create_text      
         create_skill_name
         select_target(0)
      end
      Graphics.transition(0)
      loop do
           Graphics.update
           Input.update
           update
           break if SceneManager.scene != self
      end
      dispose
 end  
  #--------------------------------------------------------------------------
  # ● Create Layout
  #--------------------------------------------------------------------------      
  def create_layout
      @layout_1 = Plane.new
      @layout_1.bitmap = Cache.system("XAS_Target_Layout1")
      @layout_1.z = 10100
      @layout_1.opacity = 255
  end  
 
 #--------------------------------------------------------------------------
 # ● Create Layout
 #--------------------------------------------------------------------------      
 def create_layout_skill
     @skill_layout = Sprite.new
     @skill_layout.bitmap = Cache.system("XAS_Active_Help")
     @skill_layout.z = 10101
     @skill_layout.x = -100    
     @skill_layout.y = 32
     @skill_layout.opacity = 0
 end 
    
 #--------------------------------------------------------------------------
 # ● Create Cursor
 #--------------------------------------------------------------------------             
 def create_cusrsor
     @cursor = Sprite.new
     @cursor.bitmap = Cache.system("XAS_Cursor")
     @cursor.z = 10105
     @cursor.x = @new_x
     @cursor.y = @new_y
     @cursor.opacity = 255
     @cursor.visible = true
 end
 
 #--------------------------------------------------------------------------
 # ● Create Text
 #--------------------------------------------------------------------------    
 def create_text
     @text = Sprite.new
     @text.bitmap = Bitmap.new(200,40)
     @text.z = 10102
     @text.bitmap.font.size = 20
     @text.bitmap.font.bold = true
     @text.bitmap.font.name = "Georgia"  
     @text.bitmap.draw_text(0, 0, 200, 40, @text_string.to_s,1) 
     @text.opacity = 255
     @text.x = @new_x
     @text.y = @new_y    
 end 
 
 #--------------------------------------------------------------------------
 # ● Create Text
 #--------------------------------------------------------------------------    
 def create_skill_name
     @skill_name = Plane.new
     @skill_name.bitmap = Bitmap.new(640,480)
     @skill_name.z = 10103
     @skill_name.bitmap.font.size = 20
     @skill_name.bitmap.font.bold = true
     @skill_name.bitmap.font.name = "Georgia"  
     @skill_name.oy = -40
     skill = $data_skills[$game_temp.xas_target_shoot_id]
     skill_text = skill.name.to_s + " - " + skill.description.to_s     
     @skill_name.bitmap.draw_text(0, 0, 640, 40, skill_text,1) 
     @skill_name.opacity = 0
 end  
 
 #--------------------------------------------------------------------------
 # ● Dispose
 #--------------------------------------------------------------------------            
 def dispose 
     Graphics.freeze
     @spriteset.dispose
     if @cursor != nil 
        @cursor.bitmap.dispose
        @cursor.dispose  
        @text.bitmap.dispose
        @text.dispose
        @skill_layout.bitmap.dispose
        @skill_layout.dispose
        @skill_name.bitmap.dispose
        @skill_name.dispose
        @layout_1.bitmap.dispose
        @layout_1.dispose
     end
 end
 
 #--------------------------------------------------------------------------
 # ● Update
 #--------------------------------------------------------------------------          
 def update
     return if @index_max == -1
     @spriteset.update
     update_cursor_slide
     update_layout_slide
     update_targe_select
 end 
 
 #--------------------------------------------------------------------------
 # ● Update Layout Slide
 #--------------------------------------------------------------------------            
 def update_layout_slide
     @layout_1.ox += 3
     if @skill_layout.x < 0
        @skill_layout.x += 10
        @skill_layout.opacity += 25
        @skill_name.opacity += 25
     else
        @skill_layout.x = 0
        @skill_layout.opacity = 255
        @skill_name.opacity = 255
        @skill_name.ox -= 3
     end  
 end  
 
 #--------------------------------------------------------------------------
 # ● Refresh Text
 #--------------------------------------------------------------------------            
 def refresh_text
     @text.bitmap.clear
     @text.bitmap.draw_text(0, 0, 200, 40, @text_string.to_s,1) 
 end
  
 #--------------------------------------------------------------------------
 # ● Update Cursor Slide
 #--------------------------------------------------------------------------           
 def update_cursor_slide
     @speed_x = [[(@cursor.x - @new_x / 60), 1].max, 60].min
     @speed_y = [[(@cursor.y - @new_y / 60), 1].max, 60].min
     if @cursor.x > @new_x 
        @cursor.x -= @speed_x.abs
        @cursor.x = @new_x if @cursor.x < @new_x
     elsif @cursor.x < @new_x 
        @cursor.x += @speed_x.abs
        @cursor.x = @new_x if @cursor.x > @new_x
     end         
      
     if @cursor.y > @new_y
        @cursor.y -= @speed_y.abs
        @cursor.y = @new_y if @cursor.y < @new_y
     elsif @cursor.y < @new_y
        @cursor.y += @speed_y.abs
        @cursor.y = @new_y if @cursor.y > @new_y
     end       
     @text.x = - 85 + @cursor.x
     @text.y = 20 + @cursor.y
     if @fy_time > 25
        @fy += 1
     elsif @fy_time > 0
        @fy -= 1
     else   
        @fy = 0
        @fy_time = 50
     end  
     @fy_time -= 1 
     @cursor.oy = @fy
     
 end
 
 #--------------------------------------------------------------------------
 # ● Select Target(type)
 #--------------------------------------------------------------------------           
 def select_target(type)
     return if  @index_max < 0
     check_index
     valor = 0
     for event in $game_map.events.values
        if event.target and event.battler?
           if valor == @target_index
              @new_x = event.screen_x - 10
              @new_y = event.screen_y
              @text_string = event.battler.name
              $game_temp.xas_target_x = event.x
              $game_temp.xas_target_y = event.y
              $game_temp.xas_target_time = 1
            end
            valor += 1  
         end  
     end   
     refresh_text  
  end

 #--------------------------------------------------------------------------
 # ● Cancel Select
 #--------------------------------------------------------------------------              
 def cancel_select
     Sound.play_buzzer
     $game_temp.xas_target_x = 0
     $game_temp.xas_target_y = 0      
     $game_temp.xas_target_time = 0
     $game_temp.xas_target_shoot_id = 0
     SceneManager.call(Scene_Map)
 end
   
  #--------------------------------------------------------------------------
  # ● Update Target Select
  #--------------------------------------------------------------------------            
  def update_targe_select
      if Input.trigger?(Input::B)
         cancel_select
      elsif Input.trigger?(Input::DOWN) or Input.trigger?(Input::RIGHT)  
         @target_index += 1
         select_target(0)
         Sound.play_cursor
      elsif Input.trigger?(Input::UP) or Input.trigger?(Input::LEFT)
         @target_index -= 1
         select_target(1)
         Sound.play_cursor
      elsif Input.trigger?(Input::C)
         Sound.play_ok
         SceneManager.call(Scene_Map)
      end  
  end
  
  #--------------------------------------------------------------------------
  # ● Check Index
  #--------------------------------------------------------------------------                
  def check_index
      if @target_index > @index_max
         @target_index = 0
      end      
      if @target_index < 0
         @target_index = @index_max
      end    
  end        
  
end  


#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
#■ MISC - MAIN UPDATE
#■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

#===============================================================================
# ■  Spriteset_Map
#===============================================================================
class Spriteset_Map
  
  #--------------------------------------------------------------------------
  # ● update
  #--------------------------------------------------------------------------  
  alias xas_main_update update
  def update
      xas_main_update
      update_xas_spriteset_map
  end

  #--------------------------------------------------------------------------
  # ● Update XAS Spriteset Map 
  #--------------------------------------------------------------------------      
  def update_xas_spriteset_map 
      refresh_token if $game_map.need_refresh_token
      refresh_hud if can_refresh_hud?
      update_hud_visible
  end    
end 


#===============================================================================
# ■ Sprite_Character
#===============================================================================
class Sprite_Character < Sprite_Base
  
  #--------------------------------------------------------------------------
  # ● Update
  #--------------------------------------------------------------------------            
  alias x_update update
  def update
      x_update
      execute_damage_pop  if can_damage_pop_base? 
      update_x_effects if can_update_x_effects?
  end
    
end    

#===============================================================================
# ■ Game Character
#===============================================================================
class Game_Character < Game_CharacterBase
  
  #--------------------------------------------------------------------------
  # ● Update
  #--------------------------------------------------------------------------    
  alias x_main_update update
  def update
      update_character_before_movement
      x_main_update
      update_character_after_movement
  end  

  #--------------------------------------------------------------------------
  # ● Update Character Before Movement
  #--------------------------------------------------------------------------      
  def update_character_before_movement
      check_xy
      update_force_action if can_force_action?
  end  
  
  #--------------------------------------------------------------------------
  # ● Update Character After Movement
  #--------------------------------------------------------------------------      
  def update_character_after_movement
      update_battler if can_update_battler?      
  end      
  
end  

#===============================================================================
# ■ Game Event
#===============================================================================
class Game_Event < Game_Character
  
  #--------------------------------------------------------------------------
  # ● Update
  #--------------------------------------------------------------------------    
  alias x_main_event_update update
  def update
      update_event_before_movement
      x_main_event_update
      update_event_after_movement
  end   
  
  #--------------------------------------------------------------------------
  # ● Update Event Before Movement
  #--------------------------------------------------------------------------      
  def update_event_before_movement
      update_sensor if can_update_sensor?
      update_treasure_duration      
  end  
  
  #--------------------------------------------------------------------------
  # ● Update Event After Movement
  #--------------------------------------------------------------------------      
  def update_event_after_movement
      
  end    
  
end  

#===============================================================================
# ■ Game Player
#===============================================================================
class Game_Player < Game_Character

  #--------------------------------------------------------------------------
  # ● Update
  #--------------------------------------------------------------------------    
  alias x_main_player_update update
  def update
      update_player_before_movement if party_system?
      x_main_player_update
      update_player_after_movement if party_system?
  end   
  
  #--------------------------------------------------------------------------
  # ● Update Player Before Movement
  #--------------------------------------------------------------------------      
  def update_player_before_movement
      check_actor_level
      update_reset_battler_setting_time
      if $game_system.old_interpreter_running != $game_map.interpreter.running?
         refresh_interpreter_effect 
      end   
  end  
  
  #--------------------------------------------------------------------------
  # ● Update Player after Movement
  #--------------------------------------------------------------------------      
  def update_player_after_movement
      update_action_command if can_use_command?
      $game_temp.change_leader_wait_time -= 1 if $game_temp.change_leader_wait_time > 0
  end       
  
end

#==============================================================================
# ■ Sprite Picture
#==============================================================================
class Sprite_Picture < Sprite
  
 #--------------------------------------------------------------------------
 # ● Update
 #--------------------------------------------------------------------------     
  alias mog_fix_picture_erased_update update
  def update
      return if picture_erased?  
      mog_fix_picture_erased_update
  end  
  
 #--------------------------------------------------------------------------
 # ● Picture Erased?
 #--------------------------------------------------------------------------     
  def picture_erased?
      return false if @picture.name != ""
      if self.bitmap != nil
         self.bitmap.dispose
         self.bitmap = nil
      end  
      return true 
  end
  
end