#==============================================================================
# ■ +++ MOG - XAS CT SYSTEM (v1.0) +++
#==============================================================================
# By Moghunter
# http://www.atelier-rgss.com
#==============================================================================
# Ativa o sistema de Combat Time no XAS.
#===============================================================================
# Para modificar o sistema de CT nos personagens durante o jogo, use os
# comandos abaixo.
# 
# actor = $game_party.members[X1]
# actor.ct_max = X2
# actor.ct_speed = X3
#
# X1 - ID do personagem.
# X2 - A quantidade de CT maximo.
# X3 - Velocidade de carregar o CT.
# 
#===============================================================================
module XAS_CT_SYSTEM
  # Posição geral da hud.
  CT_POSITION = [0,320]
  # Posição do medidor.
  CT_GAUGE_POSITION = [29, 5]
  # As ações das habilidades deverão esperar até que o medidor ficar completo.
  CT_ACTION_WAIT_FULL_GAUGE = false
  # Ativar custo de escudo.
  CT_COST_SHIELD = true
  # Ativar custo de corrida.
  CT_COST_DASH = true
  # Definição do som quando o medidor ficar completo.
  CT_FULL_SE = "Ice1"
  # Tempo mínimo para ativar o som do medidor completo.
  CT_FULL_SE_ENABLE_TIME = 30
  # Definição do som quando o medidor chegar ao zero.
  CT_WAIT_SE = "Cancel1"
  # Velocidade da animação do medidor.
  CT_METER_FLOW_SPEED = 5
  # Definição inicial do CT para cada personagem.
  # ACTOR_INITIAL_CT  = {A=>[B,C]}
  # A = Actor ID
  # B = CT Max
  # C = CT speed  
  ACTOR_INITIAL_CT = {
  2=>[200,4]
  } 
end  

#===============================================================================
# ■ Game Temp
#===============================================================================
class Game_Temp
  
  attr_accessor :ct_sound_time
  
  #--------------------------------------------------------------------------
  # ● Initialize
  #--------------------------------------------------------------------------        
  alias xas_ct_initialize initialize
  def initialize
      @ct_sound_time = 0
      xas_ct_initialize 
  end
  
end  


#===============================================================================
# ■ Game System
#===============================================================================
class Game_System
  
  attr_accessor :ct_system
  
  #--------------------------------------------------------------------------
  # ● Initialize
  #--------------------------------------------------------------------------        
  alias xas_ct_initialize initialize
  def initialize
      @ct_system = true
      xas_ct_initialize 
  end
  
end  


#===============================================================================
# ■ Game Actor
#===============================================================================
class Game_Actor < Game_Battler
  
  attr_accessor :ct
  attr_accessor :ct_max
  attr_accessor :ct_speed
  attr_accessor :ct_wait
  
  #--------------------------------------------------------------------------
  # ● Iinitialize
  #--------------------------------------------------------------------------      
  alias xas_ct_initialize initialize
  def initialize(actor_id)
      xas_ct_initialize(actor_id)
      @ct_max = 100
      @ct = @ct_max 
      @ct_speed = 1
      @ct_wait = false
      setup_initial_ct(actor_id)      
  end  
  
  #--------------------------------------------------------------------------
  # ● Setup Initial CT
  #--------------------------------------------------------------------------        
  def setup_initial_ct(actor_id) 
      ct_par = XAS_CT_SYSTEM::ACTOR_INITIAL_CT[actor_id]
      if ct_par != nil
         @ct_max = ct_par[0]
         @ct_speed = ct_par[1]
         @ct = @ct_max 
      end  
  end
  
  #--------------------------------------------------------------------------
  # ● CT
  #--------------------------------------------------------------------------        
  def ct
      n = [[@ct, 0].max, @ct_max].min
      return n    
  end  
  
  #--------------------------------------------------------------------------
  # ● CT Max
  #--------------------------------------------------------------------------        
  def ct_max
      n = [[@ct_max, 1].max, 9999].min
      return n    
  end
 
  #--------------------------------------------------------------------------
  # ● CT Speed
  #--------------------------------------------------------------------------        
  def ct_speed
      n_speed = @ct_speed * @ct_max / 100 
      n = [[n_speed, 0].max, @ct_max].min
      return n    
  end  

end

#==============================================================================
# ■ Game_Character
#==============================================================================
class Game_Character < Game_CharacterBase
  
  #--------------------------------------------------------------------------
  # ● CT SPEED
  #--------------------------------------------------------------------------            
  alias xas_ct_update_battler update_battler
  def update_battler
      update_ct if can_update_ct?
      xas_ct_update_battler
  end  
  
  #--------------------------------------------------------------------------
  # ● Can Update CT
  #--------------------------------------------------------------------------              
  def can_update_ct?
      return false if self.battler.is_a?(Game_Enemy)         
      return true
  end  
  
  #--------------------------------------------------------------------------
  # ● Update CT
  #--------------------------------------------------------------------------              
  def update_ct
      if $game_system.ct_system == false
         self.battler.ct = self.battler.ct_max
         self.battler.ct_wait = false
         return
      end  
      $game_temp.ct_sound_time += 1 if self.battler.ct < self.battler.ct_max
      execute_ct_effect
      update_ct_wait
  end  
  
  #--------------------------------------------------------------------------
  # ● Update CT
  #--------------------------------------------------------------------------                
  def execute_ct_effect       
      if ct_cost?
         self.battler.ct -= 1 
      else
         self.battler.ct += self.battler.ct_speed
      end
  end  
    
  #--------------------------------------------------------------------------
  # ● CT Cost
  #--------------------------------------------------------------------------                  
  def ct_cost?
      return true if self.battler.shield and XAS_CT_SYSTEM::CT_COST_SHIELD
      return true if @dash_active and XAS_CT_SYSTEM::CT_COST_DASH
      return false
  end
 
  #--------------------------------------------------------------------------
  # ● Update CT Wait
  #--------------------------------------------------------------------------                    
  def update_ct_wait
      if self.battler.ct == self.battler.ct_max and self.battler.ct_wait == true
         self.battler.ct_wait = false 
         if $game_temp.ct_sound_time >= XAS_CT_SYSTEM::CT_FULL_SE_ENABLE_TIME
            se = XAS_CT_SYSTEM::CT_FULL_SE
            if se != nil
               Audio.se_play("Audio/SE/" + se , 70, 100)
            end   
         end 
         $game_temp.ct_sound_time = 0 
      end
      return if self.battler.ct_wait  
      if self.battler.ct < self.battler.ct_max
         if self.battler.shield or self.dash_active
            if self.battler.ct == 0
               self.battler.ct_wait = true 
               self.battler.shield = false
               self.dash_active = false
               se = XAS_CT_SYSTEM::CT_WAIT_SE
               if se != nil
                  Audio.se_play("Audio/SE/" + se , 100, 100)
               end   
            end  
            return
         end
         self.battler.ct_wait = true 
      end   
  end  
end  

#==============================================================================
# ■ Game_Player
#==============================================================================
class Game_Player < Game_Character
  
  #--------------------------------------------------------------------------
  # ● Can Update Command?
  #--------------------------------------------------------------------------      
  alias ct_can_use_command can_use_command?
  def can_use_command?
      if XAS_CT_SYSTEM::CT_ACTION_WAIT_FULL_GAUGE
         return false if self.battler.ct_wait 
      end   
      ct_can_use_command
  end  
  
  #--------------------------------------------------------------------------
  # ● Can Update Command?
  #--------------------------------------------------------------------------        
  alias xas_ct_can_use_shield_command can_use_shield_command?
  def can_use_shield_command?
      return false if self.battler.ct_wait 
      xas_ct_can_use_shield_command
  end

  #--------------------------------------------------------------------------
  # ● Can Update Command?
  #--------------------------------------------------------------------------        
  alias xas_ct_can_dash can_dash?
  def can_dash?
      return false if self.battler.ct_wait 
      xas_ct_can_dash
  end   
  
end  

#===============================================================================
# ■  XAS_ACTION
#===============================================================================
module XAS_ACTION
    
  #--------------------------------------------------------------------------
  # ● enough_skill_cost?
  #--------------------------------------------------------------------------          
  alias xas_ct_enough_skill_cost enough_skill_cost?
  def enough_skill_cost?(skill)
      return false unless check_ct_cost?(skill)
      xas_ct_enough_skill_cost(skill)
  end  

  #--------------------------------------------------------------------------
  # ● Check CT Cost?
  #--------------------------------------------------------------------------  
  def check_ct_cost?(skill) 
      return true if $game_system.ct_system == false
      return true if self.battler.is_a?(Game_Enemy)
      if skill.note =~ /<CT Cost = (\d+)>/
         ct_cost = $1.to_i
         if ct_cost != nil
            return false if self.battler.ct < ct_cost
            self.battler.ct -= ct_cost
         end
      end   
      return true  
  end
     
end  

#==============================================================================
# ■ Action_Meter_Sprite
#==============================================================================
class CT_Sprite
  include XAS_CT_SYSTEM
  
  #--------------------------------------------------------------------------
  # * initialize
  #--------------------------------------------------------------------------
  def initialize
      @actor = $game_party.members[0]
      return if @actor == nil
      update_meter_type
      create_layout
      create_meter     
  end
  
  #--------------------------------------------------------------------------
  # ● Create Layout
  #--------------------------------------------------------------------------    
  def create_layout
    @layout_sprite = Sprite.new
    @layout_sprite.bitmap = Cache.system("XAS_CT_Layout")
    @layout_sprite.z = 150
    @layout_sprite.x = CT_POSITION[0]
    @layout_sprite.y = CT_POSITION[1]
  end  
  
  #--------------------------------------------------------------------------
  # ● Create Meter
  #--------------------------------------------------------------------------  
  def create_meter
      @meter_flow = 0
      @meter_image = Cache.system("XAS_CT_Meter")
      @meter_height = @meter_image.height / 5
      @meter_range = @meter_image.width / 3
      @meter_sprite = Sprite.new
      @meter_sprite.bitmap = Bitmap.new(@meter_image.width,@meter_image.height)
      @meter_sprite.z = 150
      @meter_sprite.x =  CT_POSITION[0] + CT_GAUGE_POSITION[0] 
      @meter_sprite.y =  CT_POSITION[1] + CT_GAUGE_POSITION[1]
      update_meter_flow
  end  
  
  #--------------------------------------------------------------------------
  # ● Dispose
  #--------------------------------------------------------------------------
  def dispose
      return if @actor == nil
      @meter_sprite.bitmap.dispose
      @meter_sprite.dispose
      @meter_image.dispose
      @layout_sprite.bitmap.dispose
      @layout_sprite.dispose
  end
  
  #--------------------------------------------------------------------------
  # ● update
  #--------------------------------------------------------------------------
  def update
      return if @actor == nil
      update_meter_type
      update_meter_flow
      update_visible
  end
  
  #--------------------------------------------------------------------------
  # ● Update Visible
  #--------------------------------------------------------------------------      
  def update_visible
      vis = $game_system.enable_hud
      vis = false if $game_system.ct_system == false
      @meter_sprite.visible = vis
      @layout_sprite.visible = vis
  end
  
  #--------------------------------------------------------------------------
  # ● Refresh CT Meter
  #--------------------------------------------------------------------------  
  def refresh
      dispose
      initialize
  end
  
  #--------------------------------------------------------------------------
  # * update
  #--------------------------------------------------------------------------  
  def update_meter_type
      if @actor.cast_action[4] > 0
         @ct_now = @actor.cast_action[4] 
         @ct_max = @actor.cast_action[1] 
         @ct_type = 3
      elsif @actor.x_charge_action[2] > 15   
         @ct_now = @actor.x_charge_action[2] 
         @ct_max = @actor.x_charge_action[1]
         @ct_type = 3
      else
         @ct_now = @actor.ct
         @ct_max = @actor.ct_max
         @ct_type = 1
         unless @actor.ct_wait  
            if $game_player.dash_active or @actor.shield
               @ct_type = 2 
            end   
         end 
      end
      @ct_max = [[@ct_max, 1].max, @ct_max].min
      @ct_now = [[@ct_now, 0].max, @ct_max].min
      if @ct_type == 3 and @ct_now == @ct_max
         @ct_type = rand(3)        
      else
         @ct_type = 0 if @ct_now == @ct_max
      end
  end
  
  #--------------------------------------------------------------------------
  # *  meter_flow_update
  #--------------------------------------------------------------------------
  def update_meter_flow      
      @meter_sprite.bitmap.clear      
      meter_src_rect = Rect.new(0, @meter_height * 4, @meter_image.width / 3, @meter_height)
      @meter_sprite.bitmap.blt(0,0, @meter_image, meter_src_rect)      
      @meter_width = @meter_range  * @ct_now / @ct_max        
      meter_src_rect = Rect.new(@meter_flow,@ct_type * @meter_height , @meter_width, @meter_height)
      @meter_sprite.bitmap.blt(0,0, @meter_image, meter_src_rect)
      @meter_flow += CT_METER_FLOW_SPEED  
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
  alias xas_ct_initialize initialize 
  def initialize  
      @ct = CT_Sprite.new
      xas_ct_initialize
  end

  #--------------------------------------------------------------------------
  # ● dispose
  #--------------------------------------------------------------------------
  alias xas_ct_dispose dispose
  def dispose    
      @ct.dispose
      xas_ct_dispose
  end

  #--------------------------------------------------------------------------
  # ● update   
  #--------------------------------------------------------------------------
  alias xas_ct_update update
  def update   
      @ct.update
      xas_ct_update
  end
    
  #--------------------------------------------------------------------------
  # ● Refresh Hud
  #--------------------------------------------------------------------------  
  alias xas_ct_refresh_hud refresh_hud
  def refresh_hud
      xas_ct_refresh_hud 
      @ct.refresh
  end        
    
end

$mog_rgss3_xas_ct_system = true