import os
import asyncio
import edge_tts

VOICE = "pt-PT-RaquelNeural"
RATE = "-4%" # Cadência suave e límpida para crianças de 6 anos
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "audio")

# Catálogo completo de áudios educativos em pt-PT
AUDIO_ITEMS = [
    # --- LETRAS & DITONGOS: NOMES, SONS E INTRODUÇÕES ---
    ("letter_name_i", "Letra I"),
    ("letter_sound_i", "I"),
    ("letter_intro_i", "Olá amiguinho! Esta é a letra I! Ouve como faz: I!"),

    ("letter_name_u", "Letra U"),
    ("letter_sound_u", "U"),
    ("letter_intro_u", "Que fixe! Esta é a letra U! Ouve como faz: U!"),

    ("letter_name_ui", "Combinação U I"),
    ("letter_sound_ui", "Ui"),
    ("letter_intro_ui", "Fantástico! Vamos juntar as letras U e I para fazer UI! Ouve como faz: Ui!"),

    ("letter_name_iu", "Combinação I U"),
    ("letter_sound_iu", "Iu"),
    ("letter_intro_iu", "Que maravilha! Agora juntamos o I e o U para fazer IU! Ouve como faz: Iu!"),

    ("letter_name_a", "Letra A"),
    ("letter_sound_a", "A"),
    ("letter_intro_a", "Viva! Vamos aprender a letra A! Ouve como faz: A!"),

    ("letter_name_e", "Letra E"),
    ("letter_sound_e", "É"),
    ("letter_intro_e", "Espetacular! Esta é a letra E! Ouve como faz: E!"),

    # --- PALAVRAS DO EXPLORADOR (NOME CURTO E FRASE COMPLETA) ---
    # Letra I
    ("word_only_ilha", "Ilha"),
    ("word_phrase_ilha", "I de Ilha! Uma ilha no meio do mar!"),
    ("word_only_igreja", "Igreja"),
    ("word_phrase_igreja", "I de Igreja! A torre da igreja!"),
    ("word_only_iogurte", "Iogurte"),
    ("word_phrase_iogurte", "I de Iogurte! Um iogurte bem fresquinho!"),
    ("word_only_iguana", "Iguana"),
    ("word_phrase_iguana", "I de Iguana! A simpática iguana verde!"),

    # Letra U
    ("word_only_urso", "Urso"),
    ("word_phrase_urso", "U de Urso! Um urso fofinho!"),
    ("word_only_uvas", "Uvas"),
    ("word_phrase_uvas", "U de Uvas! Uvas docinhas e roxas!"),
    ("word_only_unha", "Unha"),
    ("word_phrase_unha", "U de Unha! A unha do nosso dedo!"),
    ("word_only_unicornio", "Unicórnio"),
    ("word_phrase_unicornio", "U de Unicórnio! Um unicórnio mágico!"),

    # Combinação UI
    ("word_only_ui", "Ui!"),
    ("word_phrase_ui", "Ui! Que susto apanhou o Dino!"),
    ("word_only_uivo", "Uivo"),
    ("word_phrase_uivo", "UI de Uivo! O lobo a uivar à lua no bosque!"),
    ("word_only_cuidado", "Cuidado"),
    ("word_phrase_cuidado", "UI em Cuidado! Olha com atenção para não tropeçar!"),
    ("word_only_fui", "Fui"),
    ("word_phrase_fui", "UI de Fui! Fui dar um passeio com o Dino pelo parque!"),

    # Combinação IU
    ("word_only_viu", "Viu"),
    ("word_phrase_viu", "IU de Viu! O Dino viu um ninho de passarinhos!"),
    ("word_only_riu", "Riu"),
    ("word_phrase_riu", "IU de Riu! O Dino riu muito com uma cócega divertida!"),
    ("word_only_subiu", "Subiu"),
    ("word_phrase_subiu", "IU em Subiu! O macaco subiu à árvore bem depressa!"),
    ("word_only_fugiu", "Fugiu"),
    ("word_phrase_fugiu", "IU em Fugiu! O coelhinho fugiu a saltitar pela relva!"),

    # Letra A
    ("word_only_aviao", "Avião"),
    ("word_phrase_aviao", "A de Avião! O avião a voar alto nas nuvens!"),
    ("word_only_abelha", "Abelha"),
    ("word_phrase_abelha", "A de Abelha! A abelha a fazer mel docinho!"),
    ("word_only_arvore", "Árvore"),
    ("word_phrase_arvore", "A de Árvore! Uma árvore grande com folhas verdes!"),
    ("word_only_ananas", "Ananás"),
    ("word_phrase_ananas", "A de Ananás! Um ananás delicioso e fresquinho!"),

    # Letra E
    ("word_only_elefante", "Elefante"),
    ("word_phrase_elefante", "E de Elefante! Um grande elefante com orelhas compridas!"),
    ("word_only_estrela", "Estrela"),
    ("word_phrase_estrela", "E de Estrela! Uma estrela brilhante no céu!"),
    ("word_only_escada", "Escada"),
    ("word_phrase_escada", "E de Escada! A escada para subir bem alto!"),
    ("word_only_espelho", "Espelho"),
    ("word_phrase_espelho", "E de Espelho! O espelho para ver o nosso sorriso!"),

    # --- PALAVRAS DO WORD HUNT ("DETETIVE") ---
    ("word_only_peixe", "Peixe"),
    ("word_only_livro", "Livro"),
    ("word_only_rainha", "Rainha"),
    ("word_only_biscoito", "Biscoito"),
    ("word_only_lua", "Lua"),
    ("word_only_nuvem", "Nuvem"),
    ("word_only_coruja", "Coruja"),
    ("word_only_tartaruga", "Tartaruga"),
    ("word_only_gato", "Gato"),
    ("word_only_barco", "Barco"),
    ("word_only_casa", "Casa"),
    ("word_only_banana", "Banana"),
    ("word_only_vela", "Vela"),
    ("word_only_coelho", "Coelho"),
    ("word_only_dente", "Dente"),

    # --- SOLETRAÇÃO FONOLÓGICA DAS LETRAS DO ALFABETO ---
    ("spell_a", "A"),
    ("spell_b", "Bê"),
    ("spell_c", "Cê"),
    ("spell_d", "Dê"),
    ("spell_e", "E"),
    ("spell_f", "Éfe"),
    ("spell_g", "Gê"),
    ("spell_h", "Agá"),
    ("spell_i", "I"),
    ("spell_j", "Jota"),
    ("spell_k", "Capa"),
    ("spell_l", "Éle"),
    ("spell_m", "Ême"),
    ("spell_n", "Êne"),
    ("spell_o", "O"),
    ("spell_p", "Pê"),
    ("spell_q", "Quê"),
    ("spell_r", "Érre"),
    ("spell_s", "Ésse"),
    ("spell_t", "Tê"),
    ("spell_u", "U"),
    ("spell_v", "Vê"),
    ("spell_w", "Dáblio"),
    ("spell_x", "Xis"),
    ("spell_y", "Ipsilon"),
    ("spell_z", "Zê"),
    ("spell_acute_a", "Á"),
    ("spell_tilde_a", "Ã"),
    ("spell_acute_e", "É"),
    ("spell_circumflex_e", "Ê"),
    ("spell_acute_i", "Í"),
    ("spell_acute_o", "Ó"),
    ("spell_acute_u", "Ú"),

    # --- REFORÇOS POSITIVOS E INCENTIVOS ---
    ("feedback_bravo", "Muito bem! Excelente!"),
    ("feedback_certo", "Certo! Parabéns!"),
    ("feedback_quase", "Quase! Tenta outra vez!"),
    ("feedback_soletrar", "Vamos soletrar a palavra!")
]

async def generate_single(name: str, text: str):
    file_path = os.path.join(OUTPUT_DIR, f"{name}.mp3")
    if os.path.exists(file_path) and os.path.getsize(file_path) > 1000:
        return
    print(f"A gerar: {name}.mp3 -> '{text}'")
    communicator = edge_tts.Communicate(text, VOICE, rate=RATE)
    await communicator.save(file_path)

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    semaphore = asyncio.Semaphore(4) # 4 pedidos concorrentes

    async def sem_task(name, text):
        async with semaphore:
            for attempt in range(3):
                try:
                    await generate_single(name, text)
                    break
                except Exception as e:
                    print(f"Erro em {name} (tentativa {attempt + 1}): {e}")
                    await asyncio.sleep(1)

    tasks = [sem_task(name, text) for name, text in AUDIO_ITEMS]
    await asyncio.gather(*tasks)
    print(f"\nConcluído! Todos os {len(AUDIO_ITEMS)} ficheiros de áudio gerados em '{OUTPUT_DIR}'.")

if __name__ == "__main__":
    asyncio.run(main())
