#==============================================================================
# ■ +++ MOG - XAS PARTY HUD VX (v1.0) +++
#==============================================================================
# By Moghunter
# http://www.atelier-rgss.com
#==============================================================================
# Apresenta a hud dos aliados, com a quantidade de HP e level.
#===============================================================================
module MOG_PARTY_HUD
  #Posição geral da Hud.
  HUD_POS = [250,400]
  #Posição do layout.
  LAYOUT_POS = [200, 5]
  #Posição da Face.
  FACE_POS = [202, 5]
  #Posição do medidor de HP
  HP_POS = [235, 17]
  #Posição do Level.
  LEVEL_POS = [255 , 5]
  # 0 - From Right to Left.
  # 1 - From Left to Right.
  # 2 - From Up to Down.
  # 3 - From Down to UP. 
  LAYOUT_ARRANGE_TYPE = 3  
# Priority of the HUD.
  HUD_PRIORITY_Z = 151
end  

#===============================================================================
# ■ Party Hud
#===============================================================================
class Party_Hud
 include MOG_PARTY_HUD
#--------------------------------------------------------------------------
# ● Initialize
#--------------------------------------------------------------------------  
  def initialize
      @actor = $game_party.members[0]        
      @members_size = $game_party.members.size      
      return if $game_party.members.size <= 1
      @ey = $game_party.members.size
      @leader_id = $game_party.members[0].id
      create_layout
      create_face
      create_hp
      create_level
  end
  
#--------------------------------------------------------------------------
# ● Refresh
#--------------------------------------------------------------------------    
  def restart_hud
      dispose
      initialize
  end
  
#--------------------------------------------------------------------------
# ● create_layout
#--------------------------------------------------------------------------    
  def create_layout      
      @layout_image = Cache.system("XAS_Party_Hud")
      @spc = 10
      case LAYOUT_ARRANGE_TYPE
         when 0
           @x_range = @layout_image.width + @spc
           @y_range = 0 
           @w = (@layout_image.width * $game_party.members.size)
           @h = @layout_image.height
           @x_start = 0
           @y_start = 0
         when 1
           @x_range = @layout_image.width + @spc
           @y_range = 0          
           @w = (@layout_image.width * $game_party.members.size)
           @h = @layout_image.height 
           @x_start = @w - (@layout_image.width - (@spc * $game_party.members.size)) 
           @y_start = 0           
         when 2
           @x_range = 0
           @y_range = @layout_image.height + @spc     
           @w = @layout_image.width
           @h = (@layout_image.height * $game_party.members.size)
           @x_start = 0
           @y_start = 0
         else  
           @x_range = 0
           @y_range = @layout_image.height + @spc     
           @w = @layout_image.width 
           @h = (@layout_image.height * $game_party.members.size)
           @x_start = 0
           @y_start = @h - (@layout_image.height - (@spc * $game_party.members.size))                 
      end
      @layout_sprite = Sprite.new
      @layout_sprite.bitmap = Bitmap.new(@w,@h)   
      @layout_sprite.z =  HUD_PRIORITY_Z
      refresh_layout
      @layout_sprite.x = LAYOUT_POS[0] + HUD_POS[0] - @x_start
      @layout_sprite.y = LAYOUT_POS[1] + HUD_POS[1] - @y_start
  end
  
#--------------------------------------------------------------------------
# ● Refresh Layout
#--------------------------------------------------------------------------      
  def refresh_layout
      @layout_sprite.bitmap.clear
      for i in 0...$game_party.members.size - 1
         @layout_src_rect = Rect.new(0, 0, @layout_image.width , @layout_image.height)
         @layout_sprite.bitmap.blt(@x_range * i,@y_range * i, @layout_image, @layout_src_rect) 
      end    
  end  

#--------------------------------------------------------------------------
# ● create_level
#--------------------------------------------------------------------------    
 def create_level      
      @level_image = Cache.system("XAS_Party_Number")
      @level_sprite = Sprite.new
      @level_sprite.bitmap = Bitmap.new(@w,@h) 
      @level_sprite.z = 3 + HUD_PRIORITY_Z    
      @level_sprite.x = LEVEL_POS[0] + HUD_POS[0] - @x_start
      @level_sprite.y = LEVEL_POS[1] + HUD_POS[1] - @y_start
      @level_cw = @level_image.width / 10
      @level_ch = @level_image.height  
      refresh_level
  end  
  
#--------------------------------------------------------------------------
# ● refresh_level
#--------------------------------------------------------------------------          
 def refresh_level
      @level_sprite.bitmap.clear
      index = 0
      for i in $game_party.members  
         next if i.id == @leader_id
         level_text = i.level.to_s.split(//)
         nx = @x_range * index
         ny = @y_range * index
         for r in 0..level_text.size - 1
             level_abs = level_text[r].to_i 
             level_src_rect = Rect.new(@level_cw * level_abs, 0, @level_cw, @level_ch)
             @level_sprite.bitmap.blt((@level_cw  *  r) + nx, ny , @level_image, level_src_rect)        
         end 
         index += 1  
      end   
 end  
    
#--------------------------------------------------------------------------
# ● create_hp
#--------------------------------------------------------------------------        
  def create_hp
      for i in $game_party.members
          next if i.id == @leader_id 
          @old_hp = i.hp
          @old_maxhp = i.mhp
      end      
      @hp_image = Cache.system("XAS_Party_Hp")
      @hp_sprite = Sprite.new
      @hp_sprite.bitmap = Bitmap.new(@w,@h) 
      refresh_hp
      @hp_sprite.z = 2 + HUD_PRIORITY_Z    
      @hp_sprite.x = HP_POS[0] + HUD_POS[0] - @x_start
      @hp_sprite.y = HP_POS[1] + HUD_POS[1] - @y_start
  end
    
#--------------------------------------------------------------------------
# ● refresh_hp
#--------------------------------------------------------------------------        
  def refresh_hp
      return if $game_party.members.size <= 1
      @hp_sprite.bitmap.clear
      index = 0
      for i in $game_party.members  
         next if i.id == @leader_id
         hp_size = @hp_image.width * i.hp / i.mhp  
         hp_src_rect = Rect.new(0, 0, hp_size , @hp_image.height)         
         @hp_sprite.bitmap.blt(@x_range * index,@y_range * index, @hp_image, hp_src_rect) 
         index += 1 
       end    
  end    
  
#--------------------------------------------------------------------------
# ● create_face
#--------------------------------------------------------------------------      
  def create_face
      @face_sprite = Sprite.new
      @face_sprite.bitmap = Bitmap.new(@w,@h)    
      @face_sprite.z = 1 + HUD_PRIORITY_Z    
      @face_sprite.x = FACE_POS[0] + HUD_POS[0] - @x_start
      @face_sprite.y = FACE_POS[1] + HUD_POS[1] - @y_start
      refresh_face
  end  
  
#--------------------------------------------------------------------------
# ● refresh_face
#--------------------------------------------------------------------------        
  def refresh_face
      @face_sprite.bitmap.clear
      index = 0
      for i in $game_party.members  
         next if i.id == @leader_id
         if @face_image != nil
            @face_image.dispose
         end  
         file_name = "XAS_MFace" + i.id.to_s
         unless RPG_FileTest.system_exist?(file_name)
                file_name = ""
         end           
         @face_image = Cache.system(file_name)  
         if i.hp > 0
            face_src_rect = Rect.new(0, 0, 24 , 24)
         else
            face_src_rect = Rect.new(24, 0, 24 , 24)
         end  
         @face_sprite.bitmap.blt(@x_range * index,@y_range * index, @face_image, face_src_rect) 
         index += 1 
         @face_image.dispose
       end    
  end
  
#--------------------------------------------------------------------------
# ● Dispose
#--------------------------------------------------------------------------    
  def dispose  
      return if @layout_sprite == nil
      @layout_image.dispose
      @layout_sprite.bitmap.dispose
      @layout_sprite.dispose
      @face_image.dispose
      @face_sprite.bitmap.dispose
      @face_sprite.dispose
      @hp_image.dispose
      @hp_sprite.bitmap.dispose
      @hp_sprite.dispose
      @level_image.dispose
      @level_sprite.bitmap.dispose
      @level_sprite.dispose    
  end
  
#--------------------------------------------------------------------------
# ● update
#--------------------------------------------------------------------------      
  def update
      return if @layout_sprite == nil
      update_visible
      refresh_hud if can_refresh_hud?
  end    

#--------------------------------------------------------------------------
# ● Can Refresh Hud
#--------------------------------------------------------------------------          
  def can_refresh_hud?
      for i in $game_party.members
          next if i.id == @leader_id 
          return true if @old_hp != i.hp
          return true if @old_maxhp != i.mhp
      end  
      return false
  end
  
#--------------------------------------------------------------------------
# ● Update Visible
#--------------------------------------------------------------------------        
  def update_visible
      vis = $game_system.enable_hud
      @layout_sprite.visible = vis
      @face_sprite.visible = vis
      @hp_sprite.visible = vis 
      @level_sprite.visible = vis
  end
  
#--------------------------------------------------------------------------
# ● Refresh_Hud
#--------------------------------------------------------------------------      
  def refresh_hud
      return if @layout_sprite == nil
      @leader_id = $game_party.members[0].id
      refresh_hp
      refresh_level
      refresh_face
  end    
  
end

#==============================================================================
# ■ Spriteset_Map
#==============================================================================
class Spriteset_Map
  
  #--------------------------------------------------------------------------
  # ● initialize  
  #--------------------------------------------------------------------------
  alias xas_party_hud_initialize initialize 
  def initialize  
      @party_hud = Party_Hud.new
      xas_party_hud_initialize
  end
  
  #--------------------------------------------------------------------------
  # ● Dispose
  #--------------------------------------------------------------------------
  alias xas_party_hud_dispose dispose
  def dispose    
      @party_hud.dispose
      xas_party_hud_dispose
  end
  
  #--------------------------------------------------------------------------
  # ● update   
  #--------------------------------------------------------------------------
  alias xas_party_hud_update update
  def update   
      @party_hud.update
      xas_party_hud_update
  end

  #--------------------------------------------------------------------------
  # ● Refresh Hud
  #--------------------------------------------------------------------------  
  alias xas_party_hud_refresh_hud refresh_hud
  def refresh_hud
      xas_party_hud_refresh_hud
      @party_hud.restart_hud
  end   
  
end

$mog_rgss2_xas_party_hud = true