#==============================================================================
# ■ +++ MOG - XAS Battle Cry (V1.0) +++ 
#==============================================================================
# By Moghunter
# http://www.atelier-rgss.com
#==============================================================================
# Sistema de execução de multiplas vozes (Sons) para o XAS.
#===============================================================================
module XAS_VOICE
  # Não modifique os parámetros abaixo. ----------------------------------------
  ACTOR_SKILL = []
  ACTOR_DAMAGE = []
  ACTOR_DEFEATED = []
  ACTOR_LEADER = []  
  ENEMY_SKILL = []
  ENEMY_DAMAGE = []
  ENEMY_DEFEATED = []
  # ----------------------------------------------------------------------------
  # Definição do volume da voz.
  VOLUME = 130 
  
  # Exemplo de configuração geral, o modo de configurar é igual para todas as 
  # ações do battler.
  #
  # ACTOR_SKILL[ A ] = {  B=>["C","C","C"],
  #
  # A - ID do battler.
  # B - ID da skill. (Caso necessário)
  # C - Nome do arquivo de som.
  #
  
  #----------------------------------------------------------------------------
  # ACTOR ACTION
  #----------------------------------------------------------------------------
  ACTOR_SKILL[1] = { 
  1=>["V_Attack1","V_Attack2","V_Attack3"],
  2=>["V_Attack1","V_Attack2","V_Attack3"],
  3=>["V_Attack1","V_Attack2","V_Attack3"],
  4=>["V_Attack1","V_Attack2","V_Attack3"],
  5=>["V_Attack1","V_Attack2","V_Attack3"],
  24=>["V_SKILL01","V_SKILL09","V_SKILL10"],
  25=>["V_SKILL01","V_SKILL09","V_SKILL10"],
  26=>["V_SKILL01","V_SKILL09","V_SKILL10"],
  13=>["V_SPECIAL1"],
  15=>["V_SPECIAL1"],
  19=>["V_SPECIAL1"]
  }  
  
  ACTOR_SKILL[2] = {
  6=>["A_ATTACK01","A_ATTACK03","A_ATTACK04"],
  7=>["A_ATTACK01","A_ATTACK03","A_ATTACK04"],
  8=>["A_MISC9","A_SKILL04"],  
  9=>["A_MISC9","A_SKILL04"],  
  10=>["A_MISC9","A_SKILL04"],  
  11=>["A_ATTACK01","A_ATTACK03","A_ATTACK04"],
  12=>["A_ATTACK01","A_ATTACK03","A_ATTACK04"],
  27=>["A_MISC9","A_SKILL04"], 
  28=>["A_MISC9","A_SKILL04"],  
  29=>["A_MISC9","A_SKILL04"],  
  30=>["A_MISC9","A_SKILL04"],  
  31=>["A_MISC2","A_MISC20"],  
  32=>["A_MISC16","A_MISC17","A_SKILL03"],
  33=>["A_MISC2","A_MISC20"],  
  34=>["A_MISC16","A_MISC17"],
  36=>["A_MISC18"],
  38=>["A_MISC19"],
  39=>["A_SKILL01","A_SKILL02","A_SKILL03"],
  40=>["A_SKILL01","A_SKILL02","A_SKILL03"],
  41=>["A_MISC2","A_MISC20"],  
  42=>["A_MISC2","A_MISC20"],  
  43=>["A_MISC2","A_MISC20"],  
  44=>["A_MISC16","A_MISC17"]
  }
  
  #----------------------------------------------------------------------------
  # ACTOR DAMAGE
  #----------------------------------------------------------------------------
  ACTOR_DAMAGE[1] = ["V_Damage1","V_Damage2","V_Damage3"]
  ACTOR_DAMAGE[2] = ["A_DAMAGE01","A_DAMAGE02","A_DAMAGE03"]
  
  #----------------------------------------------------------------------------
  # ACTOR DEFEATED
  #----------------------------------------------------------------------------
  ACTOR_DEFEATED[1] = ["V_Defeat1","V_Defeat2"]
  ACTOR_DEFEATED[2] = ["A_DEFEATED01"]
  
  #----------------------------------------------------------------------------
  # ACTOR LEADER
  #----------------------------------------------------------------------------
  ACTOR_LEADER[1] = ["V_SKILL10"] 
  ACTOR_LEADER[2] = ["A_MISC3"] 
  
  #----------------------------------------------------------------------------
  # ENEMY SKILL
  #----------------------------------------------------------------------------
  ENEMY_SKILL[3] = {}  
  
  #----------------------------------------------------------------------------
  # ENEMY DAMAGE
  #----------------------------------------------------------------------------
  ENEMY_DAMAGE[9] = ["SA_Damage1","SA_Damage2"]
  
  #----------------------------------------------------------------------------
  # ENEMY DEFEATED
  #----------------------------------------------------------------------------
  ENEMY_DEFEATED[4] = ["073-Animal08"]
  ENEMY_DEFEATED[5] = ["078-Small05"]
  ENEMY_DEFEATED[7] = ["080-Monster02"]
  ENEMY_DEFEATED[9] = ["SA_Defeated"]  
end

#===============================================================================
# ■  XAS_ACTION
#===============================================================================
module XAS_ACTION
  
  #--------------------------------------------------------------------------
  # ● Execute User Effects
  #--------------------------------------------------------------------------  
  alias x_voice_execute_user_effects execute_user_effects
  def execute_user_effects(skill)
      execute_voice_action(skill)
      x_voice_execute_user_effects(skill)
  end

  #--------------------------------------------------------------------------
  # ● Execute Voice Action
  #--------------------------------------------------------------------------  
  def execute_voice_action(skill)
      return if self.force_action_times > 0
      if self.battler.is_a?(Game_Enemy)
         voice = XAS_VOICE::ENEMY_SKILL[self.battler.enemy_id]
      else  
         voice = XAS_VOICE::ACTOR_SKILL[self.battler.actor_id]
      end  
      if voice != nil
         voice_list = voice[skill.id]
         return if voice_list == nil
         voice_id = voice_list[rand(voice_list.size)]
         Audio.se_play("Audio/SE/" + voice_id.to_s,XAS_VOICE::VOLUME,100) rescue nil
      end        
  end
  
end  

#===============================================================================
# ■ Sprite_Character
#===============================================================================
class Sprite_Character < Sprite_Base
  
  #--------------------------------------------------------------------------
  # ● Execute Damage Pop
  #--------------------------------------------------------------------------              
  alias x_voice_execute_damage_pop execute_damage_pop
  def execute_damage_pop
      execute_voice
      x_voice_execute_damage_pop
  end

  #--------------------------------------------------------------------------
  # ● Execute Voice
  #--------------------------------------------------------------------------                
  def execute_voice
      if @character.battler.damage.is_a?(Numeric) and
         @character.battler.damage.to_i > 0
         if @character.battler.is_a?(Game_Enemy)
            voice = XAS_VOICE::ENEMY_DAMAGE[@character.battler.enemy_id] 
         else
            voice = XAS_VOICE::ACTOR_DAMAGE[@character.battler.actor_id]
         end         
      end
      if voice != nil
         voice_id = voice[rand(voice.size)]
         Audio.se_play("Audio/SE/" + voice_id.to_s,XAS_VOICE::VOLUME,100) rescue nil
      end       
  end
  
end

#===============================================================================
# ■ Game Character
#===============================================================================
class Game_Character < Game_CharacterBase
  
  #--------------------------------------------------------------------------
  # ● Execute Enemy Defeaed Process
  #--------------------------------------------------------------------------         
   alias x_voice_execute_enemy_defeated_process execute_enemy_defeated_process
   def execute_enemy_defeated_process
       execute_enemy_defeated_voice
       x_voice_execute_enemy_defeated_process
   end 
   
  #--------------------------------------------------------------------------
  # ● Execute Actor Defeated Process
  #--------------------------------------------------------------------------                
  alias x_voice_execute_actor_defeated_process execute_actor_defeated_process
  def execute_actor_defeated_process
      execute_actor_defeated_voice
      x_voice_execute_actor_defeated_process
  end
  
  #--------------------------------------------------------------------------
  # ● Execute Actor Defeated Voice
  #--------------------------------------------------------------------------
  def execute_actor_defeated_voice
      voice = XAS_VOICE::ACTOR_DEFEATED[self.battler.actor_id]
      if voice != nil
         voice_id = voice[rand(voice.size)]
         Audio.se_play("Audio/SE/" + voice_id.to_s,XAS_VOICE::VOLUME,100) rescue nil
      end          
  end    
  
  #--------------------------------------------------------------------------
  # ● Execute Enemy Defeated Voice
  #--------------------------------------------------------------------------  
  def execute_enemy_defeated_voice
      voice = XAS_VOICE::ENEMY_DEFEATED[self.battler.enemy_id]
      if voice != nil
         voice_id = voice[rand(voice.size)]
         Audio.se_play("Audio/SE/" + voice_id.to_s,XAS_VOICE::VOLUME,100) rescue nil
      end      
  end
  
end

#===============================================================================
# ■ Game Player
#=============================================================================== 
class Game_Player < Game_Character

  #--------------------------------------------------------------------------
  # ● Change Leader
  #--------------------------------------------------------------------------                  
  alias x_voice_execute_change_leader_effect execute_change_leader_effect
  def execute_change_leader_effect
      x_voice_execute_change_leader_effect
      execute_change_leader_voice
  end
    
  #--------------------------------------------------------------------------
  # ● Execute Change Leader Voice
  #--------------------------------------------------------------------------                    
  def execute_change_leader_voice
      voice = XAS_VOICE::ACTOR_LEADER[self.battler.actor_id]
      if voice != nil
         voice_id = voice[rand(voice.size)]
         Audio.se_play("Audio/SE/" + voice_id.to_s,XAS_VOICE::VOLUME,100) rescue nil
      end   
  end  
end

$mog_rgss3_xas_battle_cry = true