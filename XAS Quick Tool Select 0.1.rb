#==============================================================================
# ■ +++ MOG - XAS QUICK TOOL SELECT (v1.0) +++
#==============================================================================
# By Moghunter
# http://www.atelier-rgss.com
#==============================================================================
# Ativa uma janela que permite o jogador escolher rapidamente as habilidades,
# equipamentos e itens usados no XAS. 
#===============================================================================
module QUICK_TOOL_SELECT
  # Botão que ativa a janela de seleção rápida.
  QUICK_TOOL_SELECT_BUTTON = Input::L
  # Ativar janela deslizante.
  ENALBLE_SLIDE = true
end

#==============================================================================
# ■ Game_Player 
#==============================================================================
class Game_Player < Game_Character
  
  #--------------------------------------------------------------------------
  # ● Update Action Command
  #--------------------------------------------------------------------------  
  alias quick_tool_update_action_command update_action_command
  def update_action_command
      update_quick_tool_button
      quick_tool_update_action_command
  end
  
  #--------------------------------------------------------------------------
  # ● Update Quick Tool Button
  #--------------------------------------------------------------------------    
  def update_quick_tool_button
      if Input.trigger?(QUICK_TOOL_SELECT::QUICK_TOOL_SELECT_BUTTON)
         return unless can_use_quick_tool_button?        
         SceneManager.call(Scene_Quick_Skill_Tool)
      end  
  end
  
  #--------------------------------------------------------------------------
  # ● Can Use Quick Tool Button
  #--------------------------------------------------------------------------      
  def can_use_quick_tool_button?
      return false if self.battler.shield
      return false if self.battler.x_charge_action[2] > 0
      return true
  end  
  
end  

#==============================================================================
# ■ Window_Skill_Tool
#==============================================================================
class Window_Skill_Tool < Window_Selectable
  
 #--------------------------------------------------------------------------
 # ● Initialize
 #--------------------------------------------------------------------------  
  def initialize(actor)
      size_x = 285
      size_y = 200
      center_x = (544 - size_x) / 2
      center_y = (416 - size_y) / 2
      super(center_x , center_y, size_x, size_y)
      @actor = actor
      self.z = 9999
      select(0)      
      activate          
      refresh
  end
 
 #------------------------------------------------------------------------------
 # ● Col Max
 #------------------------------------------------------------------------------       
  def col_max
      return 8
  end
    
 #------------------------------------------------------------------------------
 # ● Item Max
 #------------------------------------------------------------------------------         
  def item_max
      return @item_max == nil ? 0 : @item_max 
  end   
  
 #--------------------------------------------------------------------------
 # ● Skill
 #--------------------------------------------------------------------------  
  def skill
      return @data[self.index]
  end
  
 #--------------------------------------------------------------------------
 # ● Refresh
 #--------------------------------------------------------------------------  
  def refresh
      @data = []
      for skill in @actor.skills
        if skill.note =~ /<Duration = (\d+)>/
           @data.push(skill)
        end   
      end
      @item_max = @data.size
      create_contents
      for i in 0...@item_max
        draw_item(i)
      end
  end
    
 #--------------------------------------------------------------------------
 # ● Draw Item
 #--------------------------------------------------------------------------  
  def draw_item(index)
      rect = item_rect(index)
      self.contents.clear_rect(rect)
      skill = @data[index]
      if skill != nil
         rect.width -= 4
         draw_icon(skill.icon_index, rect.x, rect.y, true)
      end
  end

 #--------------------------------------------------------------------------
 # ● Item Rect
 #--------------------------------------------------------------------------  
  def item_rect(index)
      rect = Rect.new(0, 0, 0, 0)
      rect.width = 24
      rect.height = 24
      rect.x = index % col_max * 32
      rect.y = index / col_max * 24
      return rect
  end
  
 #--------------------------------------------------------------------------
 # ● Cursor Page Down
 #--------------------------------------------------------------------------    
  def cursor_pagedown
  end
  
 #--------------------------------------------------------------------------
 # ● Cursor Page Up
 #--------------------------------------------------------------------------      
  def cursor_pageup
  end

 #--------------------------------------------------------------------------
 # ● Update Help
 #--------------------------------------------------------------------------        
  def update_help
      @help_window.set_text(skill == nil ? "" : (skill.name + " - " + skill.description))
  end  
 
end

#==============================================================================
# ■ Window_Item_Tool
#==============================================================================
class Window_Item_Tool < Window_Selectable
  
 #--------------------------------------------------------------------------
 # ● Initialize
 #--------------------------------------------------------------------------  
  def initialize(actor)
      size_x = 285
      size_y = 200
      center_x = (544 - size_x) / 2
      center_y = (416 - size_y) / 2
      super(center_x , center_y, size_x, size_y)
      @actor = actor
      @column_max = 8
      self.z = 9999
      select(0)
      activate      
      refresh
  end
 
 #------------------------------------------------------------------------------
 # ● Col Max
 #------------------------------------------------------------------------------       
  def col_max
      return 8
  end
    
 #------------------------------------------------------------------------------
 # ● Item Max
 #------------------------------------------------------------------------------         
  def item_max
      return @item_max == nil ? 0 : @item_max 
  end   
 
 #--------------------------------------------------------------------------
 # ● Item
 #--------------------------------------------------------------------------  
  def item
      return @data[self.index]
  end
  
 #--------------------------------------------------------------------------
 # ● Refresh
 #--------------------------------------------------------------------------  
  def refresh
      @data = []
      for item in $game_party.items
        if item.note =~ /<Action ID = (\d+)>/ 
            @data.push(item)
        end   
      end
      for weapon in $game_party.weapons
          if weapon.note =~ /<Action ID = (\d+)>/ and @actor.equippable?(weapon)
             @data.push(weapon)        
          end
      end
      for armor in $game_party.armors
          if armor.note =~ /<Action>/ and @actor.equippable?(armor)
             @data.push(armor)        
          end
      end      
      @item_max = @data.size
      create_contents
      for i in 0...@item_max
        draw_item(i)
      end
  end
    
 #--------------------------------------------------------------------------
 # ● Draw Item
 #--------------------------------------------------------------------------  
  def draw_item(index)
      rect = item_rect(index)
      self.contents.clear_rect(rect)
      item = @data[index]
      if item != nil
         rect.width -= 4
         draw_icon(item.icon_index, rect.x, rect.y, true)
      end
  end

 #--------------------------------------------------------------------------
 # ● Item Rect
 #--------------------------------------------------------------------------  
  def item_rect(index)
      rect = Rect.new(0, 0, 0, 0)
      rect.width = 24
      rect.height = 24
      rect.x = index % col_max * 32
      rect.y = index / col_max * 24
      return rect
  end
  
 #--------------------------------------------------------------------------
 # ● Cursor Page Down
 #--------------------------------------------------------------------------    
  def cursor_pagedown
  end
  
 #--------------------------------------------------------------------------
 # ● Cursor Page Up
 #--------------------------------------------------------------------------      
  def cursor_pageup
  end
  
 #--------------------------------------------------------------------------
 # ● Update Help
 #--------------------------------------------------------------------------        
  def update_help
      @help_window.set_text(item == nil ? "" : (item.name + " - " + item.description))
  end  
  
end

#==============================================================================
# ■ Scene Quick Skill Tool
#==============================================================================
class Scene_Quick_Skill_Tool < Scene_Base
  include QUICK_TOOL_SELECT
 #--------------------------------------------------------------------------
 # ● Initialize
 #--------------------------------------------------------------------------  
  def initialize
      @actor = $game_party.members[0]
  end
  
 #--------------------------------------------------------------------------
 # ● Start
 #--------------------------------------------------------------------------  
  def start
      super
      @spriteset = Spriteset_Map.new
      @viewport = Viewport.new(0, 0, 544, 416)
      @viewport.rect.set(0, 0, 544, 416)
      @viewport.ox = 0  
      @viewport.z = 9999
      @help_window = Window_Help.new
      @help_window.viewport = @viewport      
      @skill_window = Window_Skill_Tool.new(@actor)
      @skill_window.viewport = @viewport
      @skill_window.help_window = @help_window  
      create_text_sprite
      setup_slide
  end
 
 #--------------------------------------------------------------------------
 # ● Setup Slide
 #--------------------------------------------------------------------------      
  def setup_slide 
      return unless ENALBLE_SLIDE
      @orig_x = @skill_window.x      
      @skill_window.x -= 100
      @skill_window.opacity = 0
      @skill_window.contents_opacity = 0
      @text.x = @skill_window.x 
      @text.opacity = @skill_window.opacity
      @help_window.x += 100
      @help_window.opacity = @skill_window.opacity
      @help_window.contents_opacity = @skill_window.contents_opacity      
  end
    
 #--------------------------------------------------------------------------
 # ● Create Text Sprite
 #--------------------------------------------------------------------------    
  def create_text_sprite
     @text = Sprite.new
     @text.bitmap = Bitmap.new(@skill_window.width,@skill_window.height + 32)
     @text.z = 10000
     @text.bitmap.font.size = 16
     @text.bitmap.font.bold = true
     @text.bitmap.font.name = "Georgia"  
     text_string = "Skill"
     @text.bitmap.draw_text(0, 0, @skill_window.width, 32, text_string.to_s,1) 
     @text.bitmap.font.size = 14
     text_string = "L      Item Select      R"
     @text.bitmap.draw_text(0, @skill_window.height + 5, @skill_window.width, 32, text_string.to_s,1) 
     @text.x = @skill_window.x
     @text.y = @skill_window.y - 20    
  end  
  
 #--------------------------------------------------------------------------
 # ● Perform Transition
 #--------------------------------------------------------------------------    
  def perform_transition
      if ENALBLE_SLIDE
         Graphics.transition(0)
      else   
         Graphics.transition(10)
      end  
  end
  
 #--------------------------------------------------------------------------
 # ● Terminate
 #--------------------------------------------------------------------------  
  def terminate
      super
      @spriteset.dispose
      @text.bitmap.dispose
      @text.dispose
      unless @help_window.disposed?
         @help_window.dispose
         @skill_window.dispose
      end   
  end

  #--------------------------------------------------------------------------
  # ● Pre-Terminate
  #--------------------------------------------------------------------------
  def pre_terminate
      super
      update_slide_terminate 
  end  
  
 #--------------------------------------------------------------------------
 # ● Update Slide Terminate
 #--------------------------------------------------------------------------    
  def update_slide_terminate 
      return unless ENALBLE_SLIDE
      for i in 0..10
          @skill_window.x -= 10
          @help_window.x += 10
          @skill_window.opacity -= 25
          @skill_window.contents_opacity -= 25      
          @text.x = @skill_window.x 
          @text.opacity = @skill_window.opacity
          @help_window.opacity = @skill_window.opacity
          @help_window.contents_opacity = @skill_window.contents_opacity             
         Graphics.update  
      end  
  end
  
 #--------------------------------------------------------------------------
 # ● Update
 #--------------------------------------------------------------------------  
  def update
      super
      @spriteset.update
      update_skill_selection
      update_slide
  end
  
 #--------------------------------------------------------------------------
 # ● Update Slide
 #--------------------------------------------------------------------------      
  def update_slide
      return unless ENALBLE_SLIDE
      return if @skill_window.x == @orig_x
      @skill_window.x += 10
      @help_window.x -= 10
      @skill_window.opacity += 25
      @skill_window.contents_opacity += 25      
      if @skill_window.x  >= @orig_x      
         @skill_window.x = @orig_x 
         @help_window.x = 0
         @skill_window.opacity = 255
         @skill_window.contents_opacity = 255
      end
      @text.x = @skill_window.x 
      @text.opacity = @skill_window.opacity
      @help_window.opacity = @skill_window.opacity
      @help_window.contents_opacity = @skill_window.contents_opacity      
  end  
  
 #--------------------------------------------------------------------------
 # ● Update Skill Selection
 #--------------------------------------------------------------------------  
  def update_skill_selection
      if Input.trigger?(Input::B)
         Sound.play_cancel
         SceneManager.call(Scene_Map)
      elsif Input.trigger?(Input::R) or Input.trigger?(Input::L)
         Sound.play_cursor
         SceneManager.call(Scene_Quick_Item_Tool)
      elsif Input.trigger?(Input::C)
         @skill = @skill_window.skill
         return if @skill == nil 
         @actor.skill_id = @skill.id
         Sound.play_equip    
      end
  end

end

#==============================================================================
# ■ Scene Quick Item Tool
#==============================================================================
class Scene_Quick_Item_Tool < Scene_Base
 include QUICK_TOOL_SELECT
 #--------------------------------------------------------------------------
 # ● Initialize
 #--------------------------------------------------------------------------  
  def initialize
      @actor = $game_party.members[0]
  end
  
 #--------------------------------------------------------------------------
 # ● Start
 #--------------------------------------------------------------------------  
  def start
      super
      @spriteset = Spriteset_Map.new
      @viewport = Viewport.new(0, 0, 544, 416)
      @viewport.rect.set(0, 0, 544, 416)
      @viewport.ox = 0  
      @viewport.z = 9999
      @help_window = Window_Help.new
      @help_window.viewport = @viewport      
      @item_window = Window_Item_Tool.new(@actor)
      @item_window.viewport = @viewport
      @item_window.help_window = @help_window
      create_text_sprite
      setup_slide
  end
 
 #--------------------------------------------------------------------------
 # ● Setup Slide
 #--------------------------------------------------------------------------      
  def setup_slide 
      return unless ENALBLE_SLIDE
      @orig_x = @item_window.x      
      @item_window.x -= 100
      @item_window.opacity = 0
      @item_window.contents_opacity = 0
      @text.x = @item_window.x 
      @text.opacity = @item_window.opacity
      @help_window.x += 100
      @help_window.opacity = @item_window.opacity
      @help_window.contents_opacity = @item_window.contents_opacity      
  end
    
 #--------------------------------------------------------------------------
 # ● Create Text Sprite
 #--------------------------------------------------------------------------    
  def create_text_sprite
     @text = Sprite.new
     @text.bitmap = Bitmap.new(@item_window.width,@item_window.height + 32)
     @text.z = 10000
     @text.bitmap.font.size = 16
     @text.bitmap.font.bold = true
     @text.bitmap.font.name = "Georgia"  
     text_string = "Item"
     @text.bitmap.draw_text(0, 0, @item_window.width, 32, text_string.to_s,1) 
     @text.bitmap.font.size = 14
     text_string = "L      Skill Select      R"
     @text.bitmap.draw_text(0, @item_window.height + 5, @item_window.width, 32, text_string.to_s,1) 
     @text.x = @item_window.x 
     @text.y = @item_window.y - 20    
  end  
  
 #--------------------------------------------------------------------------
 # ● Perform Transition
 #--------------------------------------------------------------------------    
  def perform_transition
      if ENALBLE_SLIDE
         Graphics.transition(0)
      else   
         Graphics.transition(10)
      end  
  end  

 #--------------------------------------------------------------------------
 # ● Terminate
 #--------------------------------------------------------------------------  
  def terminate
      super
      @spriteset.dispose
      @text.bitmap.dispose
      @text.dispose
      unless @help_window.disposed?
         @help_window.dispose
         @item_window.dispose
      end   
  end

  #--------------------------------------------------------------------------
  # ● Pre-Terminate
  #--------------------------------------------------------------------------
  def pre_terminate
      super
      update_slide_terminate 
  end    
 
 #--------------------------------------------------------------------------
 # ● Update Slide Terminate
 #--------------------------------------------------------------------------    
  def update_slide_terminate 
      return unless ENALBLE_SLIDE
      for i in 0..10
          @item_window.x -= 10
          @help_window.x += 10
          @item_window.opacity -= 25
          @item_window.contents_opacity -= 25      
          @text.x = @item_window.x 
          @text.opacity = @item_window.opacity
          @help_window.opacity = @item_window.opacity
          @help_window.contents_opacity = @item_window.contents_opacity             
          Graphics.update  
      end  
  end   
 
 #--------------------------------------------------------------------------
 # ● Update
 #--------------------------------------------------------------------------  
  def update
      super
      @spriteset.update
      update_item_selection
      update_slide
  end
  
 #--------------------------------------------------------------------------
 # ● Update Slide
 #--------------------------------------------------------------------------      
  def update_slide
      return unless ENALBLE_SLIDE
      return if @item_window.x == @orig_x
      @item_window.x += 10
      @help_window.x -= 10
      @item_window.opacity += 25
      @item_window.contents_opacity += 25      
      if @item_window.x  >= @orig_x      
         @item_window.x = @orig_x 
         @help_window.x = 0
         @item_window.opacity = 255
         @item_window.contents_opacity = 255
      end
      @text.x = @item_window.x 
      @text.opacity = @item_window.opacity
      @help_window.opacity = @item_window.opacity
      @help_window.contents_opacity = @item_window.contents_opacity      
  end    
  
 #--------------------------------------------------------------------------
 # ● Update Item Selection
 #--------------------------------------------------------------------------  
  def update_item_selection
      if Input.trigger?(Input::B)
         Sound.play_cancel
         SceneManager.call(Scene_Map)
         return
      elsif Input.trigger?(Input::R) or Input.trigger?(Input::L)
         Sound.play_cursor
         SceneManager.call(Scene_Quick_Skill_Tool)
         return
      elsif Input.trigger?(XAS_BUTTON::ACTION_2_BUTTON)   
            @item = @item_window.item
            return if @item == nil
            if @item.is_a?(RPG::Weapon)
               if @actor.dual_wield?
                  @actor.change_equip(1, @item) 
               else
                  @actor.change_equip(0, @item) 
               end  
             elsif @item.is_a?(RPG::Armor)
                   @actor.change_equip(1, @item) 
             elsif @item.is_a?(RPG::Item)   
                   @actor.item_id = @item.id
             end  
             Sound.play_equip
            return 
      elsif Input.trigger?(Input::C)
         @item = @item_window.item
         return if @item == nil 
         case @item
              when RPG::Item
                @actor.item_id = @item.id
              when RPG::Weapon
                @actor.change_equip(0, @item)                
              when RPG::Armor
                @actor.change_equip(1, @item) 
          end         
         Sound.play_equip
         @item_window.refresh
         return
      end
  end

end

$mog_rgss3_xas_quick_tool_select = true