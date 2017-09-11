#==============================================================================
# ■ +++ MOG - XAS ANTI LAG (V1.0) +++ 
#==============================================================================
# By Moghunter
# http://www.atelier-rgss.com
#==============================================================================
# Ativa o sistema de Antilag no XAS.
#==============================================================================
# Para desativar ou ativar o sistema de antilag use o comando abaixo
#
# $game_system.anti_lag = true
#
#==============================================================================
# Na caixa de notas da habilidade coloque a tag abaixo para fazer a
# habilidade ser atualizada fora da tela.
#
# <Update Out Screen>
#
#==============================================================================
module XAS_ANTI_LAG
  #Area que será atualizada fora da tela. 
  UPDATE_OUT_SCREEN_RANGE = 3 
end

#==============================================================================
# ■ Game_System
#==============================================================================
class Game_System
  attr_accessor :anti_lag
  
 #--------------------------------------------------------------------------
 # ● Initialize
 #--------------------------------------------------------------------------   
  alias mog_antilag_initialize initialize
  def initialize
      @anti_lag = true
      mog_antilag_initialize
  end  
end

#==============================================================================
# ■ Game_Character
#==============================================================================
class Game_Character < Game_CharacterBase
 
 #--------------------------------------------------------------------------
 # ● Check Event on Screen
 #-------------------------------------------------------------------------- 
 def update_anti_lag
     unless $game_system.anti_lag
         @can_update = true 
         return
     end  
     anti_lag_event_on_screen
 end 
    
 #--------------------------------------------------------------------------
 # ● Event On Screen
 #--------------------------------------------------------------------------
 def anti_lag_event_on_screen
     @can_update = false
     if anti_lag_need_update_out_screen?
        @can_update = true
        return 
     end   
     out_screen = XAS_ANTI_LAG::UPDATE_OUT_SCREEN_RANGE
     px = ($game_map.display_x).truncate
     py = ($game_map.display_y).truncate
     distance_x = @x - px
     distance_y = @y - py
     if distance_x.between?(0 - out_screen, 16 + out_screen) and
        distance_y.between?(0 - out_screen, 12 + out_screen)
        @can_update = true
     end  
 end      
  
 #--------------------------------------------------------------------------
 # ● Event On Screen
 #-------------------------------------------------------------------------- 
 def anti_lag_need_update_out_screen?    
     return true if self.force_update
     return false
 end
 
 #--------------------------------------------------------------------------
 # ● Event Effects Out Screen
 #--------------------------------------------------------------------------  
 def execute_effects_out_screen
     return if erased
     if self.battler != nil
        self.erase if self.battler.dead? 
     end 
     if self.tool_id > 0
        self.action.duration = 1
        $game_system.tools_on_map.delete(self.tool_id)
        self.erase
     end  
 end
 
 #--------------------------------------------------------------------------
 # ● Update
 #--------------------------------------------------------------------------     
  alias mog_anti_lag_update update
  def update
      unless self.is_a?(Game_Player)
          update_anti_lag
          unless @can_update
              execute_effects_out_screen
              return
          end    
      end
      mog_anti_lag_update
  end
end

#==============================================================================
# ■ Sprite Character
#==============================================================================
class Sprite_Character < Sprite_Base

 #--------------------------------------------------------------------------
 # ● Check Can Update Sprite
 #--------------------------------------------------------------------------       
  def check_can_update_sprite
      if self.visible and @character.can_update == false
         reset_sprite_effects
      end        
      self.visible = @character.can_update           
  end
  
 #--------------------------------------------------------------------------
 # ● Reset Sprite Effects
 #--------------------------------------------------------------------------         
  def reset_sprite_effects
      dispose_animation
  end
  
 #--------------------------------------------------------------------------
 # ● Update
 #--------------------------------------------------------------------------           
  alias mog_anti_lag_update update
  def update
      if $game_system.anti_lag
         check_can_update_sprite
         return unless self.visible
      end   
      mog_anti_lag_update
  end
  
end  

$mog_rgss3_xas_anti_lag = true