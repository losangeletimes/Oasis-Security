"""
Generate optimized, 250-character Loudly Text-to-Music prompts for Kaels-themed stories.
Includes hashtags, keywords, and scene descriptors for musical scores from a 360-degree perspective.
"""

# Key entities and context
directors = ["Savannah Steele", "Maya Evergreen"]
narrators = ["kale", "kael"]
keywords = [
    "kael", "kael-ian", "music history", "culture", "food", 
    "360-degree", "adventure", "camera", "kaelian"
]

def build_prompt(scene, mood, tempo, style, director, narrator):
    base = (
        f"Scene: {scene} | Director: {director} | Narrator: {narrator} | "
        f"Score: {style} in {tempo} BPM, {mood} | "
        "Kaelian adventure, 360-degree perspective. "
        "Culture, food, and music history. "
        "#kaelian #adventure #music #culture"
    )
    # Ensure 250 character limit
    if len(base) > 250:
        base = base[:247] + "..."
    return base

# Example scenes
scenes = [
    "Kaelian street food festival at sunset",
    "Historical music parade in New Kael City",
    "Cultural gathering in the forest amphitheater",
    "360-degree camera follows kale through marketplace"
]

moods = ["uplifting", "mysterious", "celebratory", "nostalgic"]
tempos = [120, 128, 100, 140]
styles = ["orchestral electronic", "world fusion", "cinematic", "modern house"]

if __name__ == "__main__":
    for i, scene in enumerate(scenes):
        prompt = build_prompt(
            scene=scene,
            mood=moods[i % len(moods)],
            tempo=tempos[i % len(tempos)],
            style=styles[i % len(styles)],
            director=directors[i % len(directors)],
            narrator=narrators[i % len(narrators)]
        )
        print(prompt)