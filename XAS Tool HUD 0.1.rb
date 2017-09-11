#==============================================================================
# ■ +++ MOG - XAS TOOL HUD (v1.0) +++
#==============================================================================
# By Moghunter
# http://www.atelier-rgss.com
#==============================================================================
# Apresenta as huds usadas pelas ferramentas usadas no XAS , mais a hud da
# quantidade de ouro.
#===============================================================================
module XAS_TOOL_HUD
   #Ativar a Hud de habilidades.
   ENABLE_SKILL_HUD = true
   #Ativar a Hud de Item.
   ENABLE_ITEM_HUD = true
   #Ativar a Hud de Armas.
   ENABLE_WEAPON_HUD = true
   #Ativar a Hud de Escudo.
   ENABLE_SHIELD_HUD = true
   #Ativar a Hud de Dinheiro(Gold).
   ENABLE_GOLD_HUD = true
   #Posição geral da hud de Item.
   ITEM_HUD = [220,365]
   #Posição geral da hud de Habilidades
   SKILL_HUD = [264,365]
   #Posição geral da hud de armas.
   WEAPON_HUD = [308,365]
   #Posição geral da hud de escudo.
   SHIELD_HUD = [352,365]
   #Posição geral da hud de dinheiro(Gold).
   GOLD_HUD = [430,395]
   #Posição do numero de dinheiro(Gold).
   GOLD_NUMBER = [40,1]
   #Posição do Layout.
   LAYOUT = [0,0]
   #Posição do Ícone.
   ICON = [5, 12]
   #Posição do numero.
   NUMBER = [18, 35]
   #Ajuste de espaço entre os numeros.
   NUMBER_SPACE = 0
end

#==============================================================================
# ■ Tool Hud
#==============================================================================
class Tool_Hud
  include XAS_TOOL_HUD
   
 #--------------------------------------------------------------------------
 # ● Initialize
 #--------------------------------------------------------------------------  
  def initialize
      @actor = $game_party.members[0]
      return if @actor == nil
      @icon_image = Cache.system("Iconset")
      @number_image = Cache.system("XAS_Tool_Number")
      @number_cw = @number_image.width / 10
      @number_ch = @number_image.height / 3      
      @number_sc = @number_cw + NUMBER_SPACE
      create_skill if ENABLE_SKILL_HUD
      create_item if ENABLE_ITEM_HUD
      create_weapon if ENABLE_WEAPON_HUD
      create_shield if ENABLE_SHIELD_HUD
      create_gold if ENABLE_GOLD_HUD
  end  

 #--------------------------------------------------------------------------
 # ● Refresh
 #--------------------------------------------------------------------------    
 def refresh
     dispose  
     initialize
 end  
  
 #--------------------------------------------------------------------------
 # ● Create Gold
 #--------------------------------------------------------------------------     
 def create_gold
     @gold = $game_party.gold
     @gold_old = @gold
     @gold_ref = @gold_old
     @gold_refresh = false         
     # Layout -------------------------------------------------------------------
     @gold_layout_sprite = Sprite.new
     @gold_layout_sprite.bitmap = Cache.system("XAS_Tool_Gold")
     @gold_layout_sprite.z = 151
     @gold_layout_sprite.x = GOLD_HUD[0]
     @gold_layout_sprite.y = GOLD_HUD[1]
     # Gold ---------------------------------------------------------------------
     @gold_number_sprite = Sprite.new
     @gold_number_sprite.bitmap = Bitmap.new(@number_image.width, @number_image.height / 3)
     @gold_number_sprite.z = 152
     @gold_number_sprite.x = GOLD_HUD[0] + GOLD_NUMBER[0] 
     @gold_number_sprite.y = GOLD_HUD[1] + GOLD_NUMBER[1] 
     gold_number_update     
 end
 
 #--------------------------------------------------------------------------
 # ● Create Shield
 #--------------------------------------------------------------------------    
 def create_shield
      #LAYOUT ------------------------------------------------------------
      @shield_layout_sprite = Sprite.new
      @shield_layout_sprite.bitmap = Cache.system("XAS_Tool_Shield")
      @shield_layout_sprite.z = 150
      @shield_layout_sprite.x = SHIELD_HUD[0] + LAYOUT[0]
      @shield_layout_sprite.y = SHIELD_HUD[1] + LAYOUT[1] 
      @shield = @actor.equips[1]
      @old_shield = @shield
      if @shield != nil
         icon_index = @shield.icon_index
      else 
         icon_index = 0
      end   
      @shield_icon_sprite = Sprite.new
      @shield_icon_sprite.bitmap = Bitmap.new(24,24)
      bitmap_shield_rect = Rect.new(icon_index % 16 * 24, icon_index / 16 * 24, 24, 24)
      @shield_icon_sprite.bitmap.blt(0, 0, @icon_image, bitmap_shield_rect)
      @shield_icon_sprite.z = 151
      @shield_icon_sprite.x = SHIELD_HUD[0] + ICON[0]
      @shield_icon_sprite.y = SHIELD_HUD[1] + ICON[1]           
      #NUMBER ------------------------------------------------------------
      @shield_number_sprite = Sprite.new
      @shield_number_sprite.bitmap = Bitmap.new(@number_image.width, @number_image.height / 3)
      @shield_number_sprite.z = 152
      refresh_shield_number
 end 
 
 #--------------------------------------------------------------------------
 # ● Refresh Shield Number
 #--------------------------------------------------------------------------     
 def refresh_shield_number
     @shield_number = 0
     @s_item = 0
     @shield_number_sprite.bitmap.clear
     return if @shield == nil
     if @shield.note =~ /<Action ID = (\d+)>/
         action_id =  $1.to_i    
         skill = $data_skills[action_id]
         if skill != nil
            if skill.note =~ /<Item Cost = (\d+)>/
               item_id = $1.to_i 
               if item_id != nil
                  @s_item = $data_items[item_id]
                  @shield_number = $game_party.item_number(@s_item)              
               end
             end
         end    
     end  
     return if @s_item == 0
     cost_split = @shield_number.to_s.split(//)
     for r in 0..cost_split.size - 1 
         number_abs = cost_split[r].to_i 
         src_rect = Rect.new(@number_cw * number_abs, 0, @number_cw, @number_ch)
         @shield_number_sprite.bitmap.blt(@number_sc  *  r, 0, @number_image, src_rect)        
     end         
     xf = ((cost_split.size * @number_sc) / 2)
     @shield_number_sprite.x = SHIELD_HUD[0] + NUMBER[0] - xf
     @shield_number_sprite.y = SHIELD_HUD[1] + NUMBER[1]  
 end   
 
 #--------------------------------------------------------------------------
 # ● Create Weapon
 #--------------------------------------------------------------------------    
 def create_weapon
      #LAYOUT ------------------------------------------------------------
      @weapon_layout_sprite = Sprite.new
      @weapon_layout_sprite.bitmap = Cache.system("XAS_Tool_Weapon")
      @weapon_layout_sprite.z = 150
      @weapon_layout_sprite.x = WEAPON_HUD[0] + LAYOUT[0]
      @weapon_layout_sprite.y = WEAPON_HUD[1] + LAYOUT[1] 
      #ICON
      @weapon = @actor.equips[0]
      @old_weapon = @weapon
      if @weapon != nil
         icon_index = @weapon.icon_index
      else 
         icon_index = 0
      end   
      @weapon_icon_sprite = Sprite.new
      @weapon_icon_sprite.bitmap = Bitmap.new(24,24)
      bitmap_weapon_rect = Rect.new(icon_index % 16 * 24, icon_index / 16 * 24, 24, 24)
      @weapon_icon_sprite.bitmap.blt(0, 0, @icon_image, bitmap_weapon_rect)
      @weapon_icon_sprite.z = 151
      @weapon_icon_sprite.x = WEAPON_HUD[0] + ICON[0]
      @weapon_icon_sprite.y = WEAPON_HUD[1] + ICON[1]           
      #NUMBER ------------------------------------------------------------
      @weapon_number_sprite = Sprite.new
      @weapon_number_sprite.bitmap = Bitmap.new(@number_image.width, @number_image.height / 3)
      @weapon_number_sprite.z = 152
      refresh_weapon_number
 end

 #--------------------------------------------------------------------------
 # ● Refresh Weapon Number
 #--------------------------------------------------------------------------     
 def refresh_weapon_number
     @weapon_number = 0
     @w_item = 0
     @weapon_number_sprite.bitmap.clear
     return if @weapon == nil
     if @weapon.note =~ /<Action ID = (\d+)>/
         action_id =  $1.to_i    
         skill = $data_skills[action_id]
         if skill != nil
            if skill.note =~ /<Item Cost = (\d+)>/
               item_id = $1.to_i 
               if item_id != nil
                  @w_item = $data_items[item_id]
                  @weapon_number = $game_party.item_number(@w_item)              
               end
             end
         end    
     end  
     return if @w_item == 0
     cost_split = @weapon_number.to_s.split(//)
     for r in 0..cost_split.size - 1 
         number_abs = cost_split[r].to_i 
         src_rect = Rect.new(@number_cw * number_abs, 0, @number_cw, @number_ch)
         @weapon_number_sprite.bitmap.blt(@number_sc  *  r, 0, @number_image, src_rect)        
     end         
     xf = ((cost_split.size * @number_sc) / 2)
     @weapon_number_sprite.x = WEAPON_HUD[0] + NUMBER[0] - xf
     @weapon_number_sprite.y = WEAPON_HUD[1] + NUMBER[1]  
 end  
 
 #--------------------------------------------------------------------------
 # ● Create Skill
 #--------------------------------------------------------------------------   
  def create_skill
      #LAYOUT ------------------------------------------------------------
      @skill_layout_sprite = Sprite.new
      @skill_layout_sprite.bitmap = Cache.system("XAS_Tool_Skill")
      @skill_layout_sprite.z = 150
      @skill_layout_sprite.x = SKILL_HUD[0] + LAYOUT[0]
      @skill_layout_sprite.y = SKILL_HUD[1] + LAYOUT[1]
      #ICON ------------------------------------------------------------
      @old_skill = @actor.skill_id
      @skill = $data_skills[@actor.skill_id]
      if @skill != nil
         icon_index = @skill.icon_index
         @skill_mp_cost = @skill.mp_cost
      else  
         icon_index = 0
         @skill_mp_cost = 0
      end  
      @skill_icon_sprite = Sprite.new
      @skill_icon_sprite.bitmap = Bitmap.new(24,24)
      bitmap_skill_rect = Rect.new(icon_index % 16 * 24, icon_index / 16 * 24, 24, 24)
      @skill_icon_sprite.bitmap.blt(0, 0, @icon_image, bitmap_skill_rect)
      @skill_icon_sprite.z = 151
      @skill_icon_sprite.x = SKILL_HUD[0] + ICON[0]
      @skill_icon_sprite.y = SKILL_HUD[1] + ICON[1]    
      #NUMBER ------------------------------------------------------------
      skill_number_bitmap = Bitmap.new(@number_image.width, @number_image.height / 3)
      @skill_number_sprite = Sprite.new
      @skill_number_sprite.bitmap = skill_number_bitmap
      cost_split = @skill_mp_cost.to_s.split(//)
      for r in 0..cost_split.size - 1 
          number_abs = cost_split[r].to_i 
          src_rect = Rect.new(@number_cw * number_abs, @number_ch, @number_cw, @number_ch)
          skill_number_bitmap.blt(@number_sc  *  r, 0, @number_image, src_rect)        
      end         
      @skill_number_sprite.z = 152
      xf = ((cost_split.size * @number_sc) / 2)
      @skill_number_sprite.x = SKILL_HUD[0] + NUMBER[0] - xf
      @skill_number_sprite.y = SKILL_HUD[1] + NUMBER[1]          
  end
 
 #--------------------------------------------------------------------------
 # ● Create Item
 #--------------------------------------------------------------------------     
  def create_item
      #LAYOUT ------------------------------------------------------------
      @item_layout_sprite = Sprite.new
      @item_layout_sprite.bitmap = Cache.system("XAS_Tool_Item")
      @item_layout_sprite.z = 150
      @item_layout_sprite.x = ITEM_HUD[0] + LAYOUT[0]
      @item_layout_sprite.y = ITEM_HUD[1] + LAYOUT[1]
      #ICON ------------------------------------------------------------
      @old_item = @actor.item_id
      @item = $data_items[@actor.item_id]
      if @item != nil
         icon_index = @item.icon_index
         @item_number = $game_party.item_number(@item)
      else  
         icon_index = 0
         @item_number = 0
      end  
      @item_icon_sprite = Sprite.new
      @item_icon_sprite.bitmap = Bitmap.new(24,24)
      bitmap_item_rect = Rect.new(icon_index % 16 * 24, icon_index / 16 * 24, 24, 24)
      @item_icon_sprite.bitmap.blt(0, 0, @icon_image, bitmap_item_rect)
      @item_icon_sprite.z = 160
      @item_icon_sprite.x = ITEM_HUD[0] + ICON[0]
      @item_icon_sprite.y = ITEM_HUD[1] + ICON[1]       
      #NUMBER ------------------------------------------------------------
      item_number_bitmap = Bitmap.new(@number_image.width, @number_image.height / 3)
      @item_number_sprite = Sprite.new
      @item_number_sprite.bitmap = item_number_bitmap
      cost_split = @item_number.to_s.split(//)
      for r in 0..cost_split.size - 1 
          number_abs = cost_split[r].to_i 
          src_rect = Rect.new(@number_cw * number_abs, 0, @number_cw, @number_ch)
          @item_number_sprite.bitmap.blt(@number_sc  *  r, 0, @number_image, src_rect)        
      end         
      @item_number_sprite.z = 152
      xf = ((cost_split.size * @number_sc) / 2)
      @item_number_sprite.x = ITEM_HUD[0] + NUMBER[0] - xf
      @item_number_sprite.y = ITEM_HUD[1] + NUMBER[1]    
  end
 
 #--------------------------------------------------------------------------
 # ● Dispose
 #--------------------------------------------------------------------------    
  def dispose
      return if @actor == nil 
      dispose_skill if ENABLE_SKILL_HUD
      dispose_item if ENABLE_ITEM_HUD
      dispose_weapon if ENABLE_WEAPON_HUD
      dispose_shield if ENABLE_SHIELD_HUD
      dispose_gold if ENABLE_GOLD_HUD
      @icon_image.dispose
      @number_image.dispose      
  end
  
 #--------------------------------------------------------------------------
 # ● Dispose Skill
 #--------------------------------------------------------------------------      
  def dispose_skill
      @skill_layout_sprite.bitmap.dispose
      @skill_layout_sprite.dispose
      @skill_icon_sprite.bitmap.dispose
      @skill_icon_sprite.dispose
      @skill_number_sprite.bitmap.dispose
      @skill_number_sprite.dispose
  end
    
 #--------------------------------------------------------------------------
 # ● Dispose Gold
 #--------------------------------------------------------------------------        
  def dispose_gold
      @gold_layout_sprite.bitmap.dispose
      @gold_layout_sprite.dispose
      @gold_number_sprite.bitmap.dispose
      @gold_number_sprite.dispose
  end
  
 #--------------------------------------------------------------------------
 # ● Dispose Item
 #--------------------------------------------------------------------------        
  def dispose_item
      @item_layout_sprite.bitmap.dispose
      @item_layout_sprite.dispose      
      @item_icon_sprite.bitmap.dispose
      @item_icon_sprite.dispose      
      @item_number_sprite.bitmap.dispose
      @item_number_sprite.dispose   
  end  
  
 #--------------------------------------------------------------------------
 # ● Dispose Weapon
 #--------------------------------------------------------------------------          
  def dispose_weapon
      @weapon_layout_sprite.bitmap.dispose
      @weapon_layout_sprite.dispose
      @weapon_icon_sprite.bitmap.dispose
      @weapon_icon_sprite.dispose
      @weapon_number_sprite.bitmap.dispose
      @weapon_number_sprite.dispose     
  end  
  
 #--------------------------------------------------------------------------
 # ● Dispose shield
 #--------------------------------------------------------------------------            
  def dispose_shield
      @shield_layout_sprite.bitmap.dispose
      @shield_layout_sprite.dispose
      @shield_icon_sprite.bitmap.dispose
      @shield_icon_sprite.dispose
      @shield_number_sprite.bitmap.dispose
      @shield_number_sprite.dispose    
  end  
 
 #--------------------------------------------------------------------------
 # ● Update
 #--------------------------------------------------------------------------    
  def update
      return if @actor == nil 
      update_visible
      refresh if can_refresh_hud?
      refresh_item if ENABLE_ITEM_HUD and can_refresh_item_number?
      refresh_weapon_number if ENABLE_WEAPON_HUD and can_refreh_weapon_number?
      refresh_shield_number if ENABLE_SHIELD_HUD and can_refreh_shield_number?
      update_gold if ENABLE_GOLD_HUD
  end
    
 #--------------------------------------------------------------------------
 # ● Update Gold
 #--------------------------------------------------------------------------          
  def update_gold 
      gold_number_down if @gold > $game_party.gold 
      gold_number_up if @gold < $game_party.gold     
      gold_number_update if @gold_refresh    
  end  
 
 #--------------------------------------------------------------------------
 # ● Can Refresh Weapon Number
 #--------------------------------------------------------------------------        
  def can_refreh_weapon_number?
      return true if @weapon_number != $game_party.item_number(@w_item)  
      return false
  end  

 #--------------------------------------------------------------------------
 # ● Can Refresh Shield Number
 #--------------------------------------------------------------------------        
  def can_refreh_shield_number?
      return true if @shield_number != $game_party.item_number(@s_item)  
      return false
  end    
  
 #--------------------------------------------------------------------------
 # ● Update Visible
 #--------------------------------------------------------------------------      
  def update_visible
      vis = $game_system.enable_hud
      if ENABLE_SKILL_HUD
         @skill_layout_sprite.visible = vis
         @skill_icon_sprite.visible = vis
         @skill_number_sprite.visible = vis
      end
      if ENABLE_ITEM_HUD
         @item_layout_sprite.visible = vis
         @item_icon_sprite.visible = vis
         @item_number_sprite.visible = vis
      end
      if ENABLE_WEAPON_HUD         
         @weapon_layout_sprite.visible = vis
         @weapon_icon_sprite.visible = vis
         @weapon_number_sprite.visible = vis
      end
      if ENABLE_SHIELD_HUD  
         @shield_layout_sprite.visible = vis
         @shield_icon_sprite.visible = vis
         @shield_number_sprite.visible = vis      
      end 
      if ENABLE_GOLD_HUD   
         @gold_layout_sprite.visible = vis
         @gold_number_sprite.visible = vis         
      end  
  end
  
 #--------------------------------------------------------------------------
 # ● Can Refresh Hud
 #--------------------------------------------------------------------------      
  def can_refresh_hud?      
      if @actor != nil
         if ENABLE_SKILL_HUD
            return true if @old_skill != @actor.skill_id
         end
         if ENABLE_ITEM_HUD
            return true if @old_item != @actor.item_id
         end
         if ENABLE_WEAPON_HUD
            return true if @old_weapon != @actor.equips[0]
         end
         if ENABLE_SHIELD_HUD
            return true if @old_shield != @actor.equips[1]
         end      
      end
      return false
  end  
   
 #--------------------------------------------------------------------------
 # ● Can Refresh Item Number
 #--------------------------------------------------------------------------        
  def can_refresh_item_number?
      return true if @item_number != $game_party.item_number(@item)      
      return false
  end  
  
 #--------------------------------------------------------------------------
 # ● Create Item
 #--------------------------------------------------------------------------     
  def refresh_item
      @item_number = $game_party.item_number(@item)   
      #Item Number ------------------------------------------------------------
      @item_number_sprite.bitmap.clear
      cost_split = @item_number.to_s.split(//)
      for r in 0..cost_split.size - 1 
          number_abs = cost_split[r].to_i 
          src_rect = Rect.new(@number_cw * number_abs, 0, @number_cw, @number_ch)
          @item_number_sprite.bitmap.blt(@number_sc  *  r, 0, @number_image, src_rect)        
      end         
      xf = ((cost_split.size * @number_sc) / 2)
      @item_number_sprite.x = ITEM_HUD[0] + NUMBER[0] - xf
  end  

  #--------------------------------------------------------------------------
  # ● gold_number_up
  #--------------------------------------------------------------------------
  def gold_number_up
      @gold_refresh = true
      @gold_ref = 20 * (@gold - @gold_old) / 100
      @gold_ref = 1 if @gold_ref < 1
      @gold += @gold_ref    
      if @gold >= $game_party.gold
         @gold_old = $game_party.gold
         @gold = $game_party.gold
         @gold_ref = 0
      end  
  end   

  #--------------------------------------------------------------------------
  # ● gold_number_down
  #--------------------------------------------------------------------------
  def gold_number_down
      @gold_refresh = true
      @gold_ref = 10 * (@gold_old - @gold) / 100
      @gold_ref = 1 if @gold_ref < 1
      @gold -= @gold_ref     
      if @gold <= $game_party.gold
         @gold_old = $game_party.gold
         @gold = $game_party.gold
         @gold_ref = 0
      end    
  end
     
  #--------------------------------------------------------------------------
  # ● gold_number_update
  #--------------------------------------------------------------------------
  def gold_number_update  
      @gold_number_sprite.bitmap.clear
      @gold_number_text = @gold.abs.to_s.split(//)
      for r in 0..@gold_number_text.size - 1
          @gold_number_abs = @gold_number_text[r].to_i 
          gold_src_rect = Rect.new(@number_cw * @gold_number_abs, @number_ch * 2, @number_cw, @number_ch)
          @gold_number_sprite.bitmap.blt(@number_cw  *  r, 0, @number_image, gold_src_rect)        
      end    
      @gold_refresh = false if @gold == $game_party.gold   
  end  
  
end

#==============================================================================
# ■ Spriteset_Map
#==============================================================================
class Spriteset_Map
  
  #--------------------------------------------------------------------------
  # ● initialize  
  #--------------------------------------------------------------------------
  alias mog_tool_hud_initialize initialize 
  def initialize  
      @toolhud = Tool_Hud.new
      mog_tool_hud_initialize
  end
  
  #--------------------------------------------------------------------------
  # ● Dispose
  #--------------------------------------------------------------------------
  alias mog_tool_hud_dispose dispose
  def dispose    
      @toolhud.dispose
      mog_tool_hud_dispose
  end
  
  #--------------------------------------------------------------------------
  # ● update   
  #--------------------------------------------------------------------------
  alias mog_tool_hud_update update
  def update   
      @toolhud.update
      mog_tool_hud_update
  end

  #--------------------------------------------------------------------------
  # ● Refresh Hud
  #--------------------------------------------------------------------------  
  alias mog_tool_hud_refresh_hud refresh_hud
  def refresh_hud
      mog_tool_hud_refresh_hud
      @toolhud.refresh
  end    
  
end   

$mog_rgss3_xas_tool_hud = true