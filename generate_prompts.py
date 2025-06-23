keys = ["A minor", "C major", "F# minor"]
tempos = [120, 128, 140]
styles = ["house", "trap", "techno"]

for key in keys:
    for tempo in tempos:
        for style in styles:
            prompt = (
                f"Create a punchy bass and kick loop in {key}, at {tempo} BPM, 4/4 time, "
                f"{style} style. The bassline should be catchy and supportive of the kick. "
                "This is for an electronic sample pack."
            )
            print(prompt)