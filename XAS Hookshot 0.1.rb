#===============================================================================
# ■ +++ MOG - XAS HOOKSHOT (v1.0) +++ 
#===============================================================================
# By Moghunter
# http://www.atelier-rgss.com
#===============================================================================
# Adiciona a função Hookshot nas habilidades do XAS + o sprite da corrente
# esticando até o alvo
#===============================================================================
# Para ativar a função do Hookshot na habilidade coloque o comando abaixo na
# caixa de notas de habilidades.
#
# <Hookshot = X>
#
# X - Area de alcance do hookshot.
#
#===============================================================================
# Para definir qual evento terá impacto do hookshot, nomeie o evento com o
# seguinte nome.
#
# <Hookshot>
#
#===============================================================================
module MOG_XAS_HOOKSHOT
  #Posição da corrente em relação ao personagem.
  HOOKSHOT_SPRITE_POSITION = [0,0]
  #Altura　do Character. 
  # 32 pixel = padrão do Rpg Maker VX.
  # 42 pixel = padrão do Rpg Maker XP.
  CHARACTER_HEIGHT = 42
end  
#==============================================================================
# ■ Game_Temp
#==============================================================================
class Game_Temp
  
  attr_accessor :hookshot 
  attr_accessor :hookshot_tool_id
  #--------------------------------------------------------------------------
  # ● Initialize
  #--------------------------------------------------------------------------          
  alias x_hookshot_initialize initialize
  def initialize
      @hookshot = false
      @hookshot_tool_id = 0
      x_hookshot_initialize
  end
end

#===============================================================================
# ■  Game_Map
#===============================================================================
class Game_Map  
  #--------------------------------------------------------------------------
  # ● clear_tokens 
  #--------------------------------------------------------------------------
  alias hookshot_clear_tokens clear_tokens
  def clear_tokens
      $game_temp.hookshot = false
      hookshot_clear_tokens 
  end
  
  #--------------------------------------------------------------------------
  # ● Execute Toll Effects Hash
  #--------------------------------------------------------------------------        
  alias mog_hookshot_execute_tool_effects_hash execute_tool_effects_hash
  def execute_tool_effects_hash(i)
      mog_hookshot_execute_tool_effects_hash(i)
      if i.tool_effect == "Hookshot"
         $game_temp.hookshot_tool_id = i.id
      end   
  end    
  
end  

#===============================================================================
# ■ Game_Action_XAS
#===============================================================================
class Game_Action_XAS 
  
  #--------------------------------------------------------------------------
  # ● attachment 
  #--------------------------------------------------------------------------
  alias hookshot_attachment attachment
  def attachment(action_id)
      hookshot_attachment(action_id)
      check_hookshot_effect(action_id)
  end
  
  #--------------------------------------------------------------------------
  # ● Check Hookshot Effect
  #--------------------------------------------------------------------------  
  def check_hookshot_effect(action_id)
      return unless @skill.note =~ /<Hookshot = (\d+)>/
      @short_range = false
      @hookshot = true
      @blow_power = 1
      @attack_range_type = 3
      @attack_range_plan = 0
      @first_impact_time = 5
      @sunflag = 1000
      @duration = 1000
      @piercing = true
      @multi_hit = false
      @all_damage = false
      @ally_damage = false
      @ignore_guard = false
      @ignore_knockback_invincible = true
      unless $game_system.tools_on_map.include?(action_id)   
             $game_system.tools_on_map.push(action_id)
      end
  end  
end

#===============================================================================
# ■ Token_Bullet  
#===============================================================================
class Token_Bullet < Token_Event
  
  #--------------------------------------------------------------------------
  # ● Check Tool Effects
  #--------------------------------------------------------------------------    
  alias x_hookshot_check_tool_effects check_tool_effects
  def check_tool_effects(user,skill,pre_direction)
      x_hookshot_check_tool_effects(user,skill,pre_direction)
      hookshot_setup(user,skill,pre_direction)
  end
    
  #--------------------------------------------------------------------------
  # ● Hookshot Setup
  #--------------------------------------------------------------------------     
  def hookshot_setup(user,skill,pre_direction)
      return if user.is_a?(Game_Event)    
      return unless skill.note =~ /<Hookshot = (\d+)>/
      self.tool_effect = "Hookshot"
      self.diagonal = false
      self.direction_fix = true
      self.force_action = "Forward"
      self.force_action_times = $1.to_i
      self.move_frequency = 6
      self.force_update = true
  end
  
end

 
#===============================================================================
# ■ Game Character
#===============================================================================
class Game_Character < Game_CharacterBase
  
  #--------------------------------------------------------------------------
  # ● Action Effect During Move
  #--------------------------------------------------------------------------          
  alias hookshot_effect_action_effect_during_move action_effect_during_move  
  def action_effect_during_move
      hookshot_effect_action_effect_during_move
      if @tool_effect == "Hookshot" and @force_action == "Toward Player"  
         if @x == $game_player.x and @y == $game_player.y
            if $game_player.action != nil
               $game_player.action.duration = 2               
            end   
            $game_player.make_pose("",2)
            self.action.duration = 10
            @force_action_times = 0
            @force_action_type = ""
          end 
        elsif @tool_effect == "Hookshot_Event"   
            case @direction
               when 2
                 xh = @x 
                 yh = @y - 1
               when 4
                 xh = @x + 1 
                 yh = @y
               when 6
                 xh = @x - 1
                 yh = @y           
               when 8
                 xh = @x
                 yh = @y + 1         
           end
           unless $game_player.moving2?   
              if xh == $game_player.x and yh == $game_player.y
                  if $game_player.action != nil
                     $game_player.action.duration = 2               
                  end   
                  $game_player.make_pose("",2)
                  if self.action != nil
                     self.action.duration = 10
                  end
                  @force_action_times = 0
                  @force_action_type = ""     
                  $game_temp.hookshot = false
                  $game_player.move_speed = XAS_BA::BASE_MOVE_SPEED
              end           
           end 
      end
  end  
  
  #--------------------------------------------------------------------------
  # ● Action EffectAfter Move
  #--------------------------------------------------------------------------            
  alias hookshot_action_effect_after_move action_effect_after_move
  def action_effect_after_move
      hookshot_action_effect_after_move
      if @tool_effect == "Hookshot"
         @force_action_times = 30
         @force_action = "Toward Player"
         @direction_fix = true
      end     
  end     
  
  #--------------------------------------------------------------------------
  # ● Can Update Battler Move Speed
  #--------------------------------------------------------------------------                  
  alias hookshot_can_update_battler_move_speed can_update_battler_move_speed?
  def can_update_battler_move_speed?  
      return false if $game_temp.hookshot
      hookshot_can_update_battler_move_speed
  end  
    
end

#===============================================================================
# ■ Game Player
#=============================================================================== 
class Game_Player < Game_Character

  #--------------------------------------------------------------------------
  # ● Change Leader
  #--------------------------------------------------------------------------                  
  alias x_hookshot_change_leader_effect execute_change_leader_effect
  def execute_change_leader_effect
      $game_temp.hookshot_tool_id = 0
      $game_temp.hookshot = false      
      x_hookshot_change_leader_effect
  end

end  
#===============================================================================
# ■  XAS_ACTION
#===============================================================================
module XAS_ACTION
  
  #--------------------------------------------------------------------------
  # ● Check Auto Effect Page
  #--------------------------------------------------------------------------  
  alias hookshot_check_auto_effect_page check_auto_effect_page
  def check_auto_effect_page(attacker, attack_id)
      hookshot_check_auto_effect_page(attacker, attack_id)
      execute_hookshot_effect_page(attacker, attack_id)
  end
  
  #--------------------------------------------------------------------------
  # ● Execute Hookshoot Effect
  #--------------------------------------------------------------------------    
  def execute_hookshot_effect_page(attacker, attack_id)
      return unless attacker.tool_effect == "Hookshot"
      return unless self.name =~ /<Hookshot>/   
      return if self.battler != nil
      case $game_player.direction
         when 2
           xh = self.x 
           yh = self.y - 1
         when 4
           xh = self.x + 1 
           yh = self.y
         when 6
           xh = self.x - 1
           yh = self.y           
         when 8
           xh = self.x
           yh = self.y + 1         
      end           
      if passable_temp_id?(xh, yh)
         $game_player.x = xh
         $game_player.y = yh
         attacker.tool_effect = "Hookshot_Event"
         attacker.force_action_times = 999
         attacker.force_action = ""
         $game_temp.hookshot = true
         $game_player.move_speed = 5
         self.refresh
         @trigger = 0
         self.start         
      end
  end  
  
  #--------------------------------------------------------------------------
  # ● Can Hold Treasure?
  #--------------------------------------------------------------------------        
  alias hookshot_can_hold_treasure can_hold_treasure?
  def can_hold_treasure?(attacker, attack_id)
      return true if attacker.tool_effect == "Hookshot"
      hookshot_can_hold_treasure(attacker, attack_id)
  end  
 
end  

#===============================================================================
# ■ XRXS_BattlerAttachment
#==============================================================================
module XRXS_BattlerAttachment 
  
  #--------------------------------------------------------------------------
  # ● Execute Blow Effect
  #--------------------------------------------------------------------------      
  alias hookshot_execute_blow_effect execute_blow_effect
  def execute_blow_effect(skill,bullet)
      execute_hookshot_effect(skill,bullet)
      hookshot_execute_blow_effect(skill,bullet)      
  end
  
  #--------------------------------------------------------------------------
  # ● Execute Hookshot_effect
  #--------------------------------------------------------------------------      
  def execute_hookshot_effect(skill,bullet)
      return unless bullet.tool_effect == "Hookshot"
      if self.temp_id == 0     
         self.temp_id = bullet.id
         self.pre_move_speed = self.move_speed    
         self.move_speed = bullet.move_speed
         self.moveto(bullet.x, bullet.y)
         self.direction = bullet.direction
         bullet.force_action_times = 30
         bullet.force_action = "Toward Player"
         bullet.direction_fix = true
      end                 
  end

end

#===============================================================================
# ■ XRXS_BattlerAttachment
#==============================================================================
module XRXS_BattlerAttachment 
  
  #--------------------------------------------------------------------------
  # ● Action can hit target?
  #--------------------------------------------------------------------------        
  alias hookshot_action_can_hit_target action_can_hit_target?
  def action_can_hit_target?(bullet, user, skill,tar_invu)
      return false if $game_temp.hookshot and self.is_a?(Game_Player)
      hookshot_action_can_hit_target(bullet, user, skill,tar_invu)
  end  
    
 #--------------------------------------------------------------------------
 # ● Can Attack Effect
 #--------------------------------------------------------------------------     
 alias hookshot_can_attack_effect can_attack_effect?
 def can_attack_effect?(attacker)
     return false if $game_temp.hookshot and self.is_a?(Game_Player)
     hookshot_can_attack_effect(attacker)
 end  
   
end   

#==============================================================================
# ■ XRXS_Hookshoot_Sprite
#==============================================================================
class Hookshot_Sprite
  
 #--------------------------------------------------------------------------
 # ● Initialize
 #--------------------------------------------------------------------------       
  def initialize
      create_chain
      update_sprite
      update_angle
      update_position    
  end
  
 #--------------------------------------------------------------------------
 # ● Create Chain
 #--------------------------------------------------------------------------         
  def create_chain
      @old_direction = 0 
      @chain_image = Cache.system("XAS_Hookshot")
      @chain_cw = @chain_image.width
      @chain_ch = @chain_image.height 
      @chain_sprite = Sprite.new
      @chain_sprite.bitmap = Bitmap.new(544,@chain_ch)
  end
  
 #--------------------------------------------------------------------------
 # ● Dispose
 #--------------------------------------------------------------------------         
  def dispose
      @chain_sprite.bitmap.dispose
      @chain_sprite.dispose
      @chain_image.dispose
  end
  
 #--------------------------------------------------------------------------
 # ● Update
 #--------------------------------------------------------------------------         
  def update
      update_visible
      return unless @chain_sprite.visible
      update_sprite
      update_angle
      update_position
  end  
  
 #--------------------------------------------------------------------------
 # ● Update Position
 #--------------------------------------------------------------------------             
  def update_visible
      if $game_temp.hookshot_tool_id == 0
         @chain_sprite.visible = false 
      else
         @chain_sprite.visible = true
      end  
  end  
  
 #--------------------------------------------------------------------------
 # ● Update Position
 #--------------------------------------------------------------------------           
  def update_position
      return if $game_player.screen_z == nil  
      ex = MOG_XAS_HOOKSHOT::HOOKSHOT_SPRITE_POSITION[0]
      ey = MOG_XAS_HOOKSHOT::HOOKSHOT_SPRITE_POSITION[1]
      case $game_player.direction
          when 2
             fx = 16 + ex
             fy = -6 + ey
          when 4
             fx = -16 + ex
             fy = 0 + ey          
          when 6
             fx = 16 + ex
             fy = -32 + ey            
          when 8  
             fx = -16 + ex
             fy = -MOG_XAS_HOOKSHOT::CHARACTER_HEIGHT + ey      
      end
      @chain_sprite.z = $game_player.screen_z
      @chain_sprite.x = $game_player.screen_x + fx
      @chain_sprite.y = $game_player.screen_y + fy
  end  

 #--------------------------------------------------------------------------
 # ● Update Angle
 #--------------------------------------------------------------------------             
  def update_angle
      return if @old_direction == $game_player.direction
      @old_direction = $game_player.direction
      case $game_player.direction
         when 2; @chain_sprite.angle = 270
         when 4; @chain_sprite.angle = 180
         when 6; @chain_sprite.angle = 0
         when 8; @chain_sprite.angle = 90
      end            
  end
    
 #--------------------------------------------------------------------------
 # ● Update Sprite
 #--------------------------------------------------------------------------           
  def update_sprite
      target = $game_map.events[$game_temp.hookshot_tool_id]
      if target == nil or target.erased
         $game_temp.hookshot_tool_id = 0
         return
      end  
      @chain_sprite.bitmap.clear
      if $game_player.direction == 2 or $game_player.direction == 8
         dist = (target.screen_y - $game_player.screen_y).abs / 6
      else
         dist = (target.screen_x - $game_player.screen_x).abs / 6
      end  
      for i in 0..6
         src_rect = Rect.new(0, 0,@chain_cw , @chain_ch)
         @chain_sprite.bitmap.blt(-@chain_cw + (dist * i),0, @chain_image, src_rect)         
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
  alias xas_hookshot_initialize initialize 
  def initialize  
      @hookshot = Hookshot_Sprite.new
      xas_hookshot_initialize
  end
  
  #--------------------------------------------------------------------------
  # ● dispose
  #--------------------------------------------------------------------------
  alias xas_hookshot_dispose dispose
  def dispose    
      @hookshot.dispose
      xas_hookshot_dispose
  end
  
  #--------------------------------------------------------------------------
  # ● update   
  #--------------------------------------------------------------------------
  alias xas_hookshot_update update
  def update   
      @hookshot.update
      xas_hookshot_update
  end
  
end

#===============================================================================
# ■ Sprite_Character
#===============================================================================
class Sprite_Character < Sprite_Base
  #--------------------------------------------------------------------------
  # ● Update Position
  #--------------------------------------------------------------------------                
  alias hookshot_update_position update_position
  def update_position
      hookshot_update_position
      if self.character.tool_effect == "Hookshot"
         case $game_player.direction 
             when 2;   self.x = $game_player.screen_x 
             when 4;   self.y = $game_player.screen_y 
             when 6;   self.y = $game_player.screen_y 
             when 8;   self.x = $game_player.screen_x      
         end
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
         if target != nil and target.tool_effect == "Hookshot" and
            target.force_action == "Toward Player" 
            case @character.direction
               when 2;  @character.y += 1
               when 4;  @character.x -= 1
               when 6;  @character.x += 1
               when 8;  @character.y -= 1  
            end
         else
            case @character.direction
               when 2;  @character.y -= 1
               when 4;  @character.x += 1
               when 6;  @character.x -= 1
               when 8;  @character.y += 1  
            end            
         
         end  
     end   
  end  
   
end

$mog_rgss3_xas_hookshot = true