import os
import asyncio
import edge_tts

VOICE = "pt-PT-RaquelNeural"
RATE = "-4%" # Cadência suave e límpida para crianças de 6 anos
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "audio")

# Catálogo completo de áudios educativos em pt-PT (frases completas + soletração)
AUDIO_ITEMS = [
    # --- LETRAS & DITONGOS: NOMES, SONS E FRASES COMPLETAS ---
    ("letter_name_i", "Letra I"),
    ("letter_sound_i", "I"),
    ("letter_intro_i", "Olá amiguinho! Esta é a letra I! Ouve como faz: I!"),
    ("letter_card_i", "Esta é a letra I! Faz o som: I!"),

    ("letter_name_u", "Letra U"),
    ("letter_sound_u", "U"),
    ("letter_intro_u", "Que fixe! Esta é a letra U! Ouve como faz: U!"),
    ("letter_card_u", "Esta é a letra U! Faz o som: U!"),

    ("letter_name_ui", "Combinação U I"),
    ("letter_sound_ui", "Ui"),
    ("letter_intro_ui", "Fantástico! Vamos juntar as letras U e I para fazer UI! Ouve como faz: Ui!"),
    ("letter_card_ui", "Esta é a combinação UI! U mais I faz: Ui!"),

    ("letter_name_iu", "Combinação I U"),
    ("letter_sound_iu", "Iu"),
    ("letter_intro_iu", "Que maravilha! Agora juntamos o I e o U para fazer IU! Ouve como faz: Iu!"),
    ("letter_card_iu", "Esta é a combinação IU! I mais U faz: Iu!"),

    ("letter_name_a", "Letra A"),
    ("letter_sound_a", "A"),
    ("letter_intro_a", "Viva! Vamos aprender a letra A! Ouve como faz: A!"),
    ("letter_card_a", "Esta é a letra A! Faz o som: A!"),

    ("letter_name_e", "Letra E"),
    ("letter_sound_e", "É"),
    ("letter_intro_e", "Espetacular! Esta é a letra E! Ouve como faz: E!"),
    ("letter_card_e", "Esta é a letra E! Faz o som: E!"),

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

    # --- FRASES COMPLETAS: QUIZ GAME (ENUNCIADO, ACERTO E INCENTIVO) ---
    ("quiz_prompt_ui", "Ui, que susto! Que combinação é esta? UI, IU, U ou I?"),
    ("quiz_success_ui", "Certo! Muito bem, é a combinação UI!"),
    ("quiz_tryagain_ui", "Quase! Esta é a combinação UI!"),

    ("quiz_prompt_uivo", "Uivo do lobo... começa por que combinação? UI, IU, U ou I?"),
    ("quiz_success_uivo", "Certo! Uivo começa com a combinação UI!"),
    ("quiz_tryagain_uivo", "Quase! A palavra Uivo começa com UI!"),

    ("quiz_prompt_viu", "Ele viu! A palavra Viu termina com que combinação? IU, UI, I ou U?"),
    ("quiz_success_viu", "Certo! A palavra Viu termina com IU!"),
    ("quiz_tryagain_viu", "Quase! A palavra Viu termina com IU!"),

    ("quiz_prompt_riu", "Ele riu! A palavra Riu termina com que combinação? IU, UI, I ou U?"),
    ("quiz_success_riu", "Certo! A palavra Riu termina com IU!"),
    ("quiz_tryagain_riu", "Quase! A palavra Riu termina com IU!"),

    ("quiz_prompt_aviao", "Avião... começa com que letra? A, E, I ou U?"),
    ("quiz_success_aviao", "Certo! Avião começa com a letra A!"),
    ("quiz_tryagain_aviao", "Quase! Avião começa com a letra A!"),

    ("quiz_prompt_elefante", "Elefante... começa com que letra? A, E, I ou U?"),
    ("quiz_success_elefante", "Certo! Elefante começa com a letra E!"),
    ("quiz_tryagain_elefante", "Quase! Elefante começa com a letra E!"),

    ("quiz_prompt_ilha", "Ilha... começa com que letra? A, E, I ou U?"),
    ("quiz_success_ilha", "Certo! Ilha começa com a letra I!"),
    ("quiz_tryagain_ilha", "Quase! Ilha começa com a letra I!"),

    ("quiz_prompt_uvas", "Uvas... começa com que letra? A, E, I ou U?"),
    ("quiz_success_uvas", "Certo! Uvas começa com a letra U!"),
    ("quiz_tryagain_uvas", "Quase! Uvas começa com a letra U!"),

    ("quiz_prompt_abelha", "Abelha... começa com que letra? A, E, I ou U?"),
    ("quiz_success_abelha", "Certo! Abelha começa com a letra A!"),
    ("quiz_tryagain_abelha", "Quase! Abelha começa com a letra A!"),

    ("quiz_prompt_estrela", "Estrela... começa com que letra? A, E, I ou U?"),
    ("quiz_success_estrela", "Certo! Estrela começa com a letra E!"),
    ("quiz_tryagain_estrela", "Quase! Estrela começa com a letra E!"),

    ("quiz_prompt_urso", "Urso... começa com que letra? A, E, I ou U?"),
    ("quiz_success_urso", "Certo! Urso começa com a letra U!"),
    ("quiz_tryagain_urso", "Quase! Urso começa com a letra U!"),

    ("quiz_prompt_iogurte", "Iogurte... começa com que letra? A, E, I ou U?"),
    ("quiz_success_iogurte", "Certo! Iogurte começa com a letra I!"),
    ("quiz_tryagain_iogurte", "Quase! Iogurte começa com a letra I!"),

    ("quiz_prompt_arvore", "Árvore... começa com que letra? A, E, I ou U?"),
    ("quiz_success_arvore", "Certo! Árvore começa com a letra A!"),
    ("quiz_tryagain_arvore", "Quase! Árvore começa com a letra A!"),

    ("quiz_prompt_escada", "Escada... começa com que letra? A, E, I ou U?"),
    ("quiz_success_escada", "Certo! Escada começa com a letra E!"),
    ("quiz_tryagain_escada", "Quase! Escada começa com a letra E!"),

    # --- FRASES COMPLETAS: WORD HUNT ("DETETIVE DAS LETRAS") ---
    ("hunt_prompt_peixe", "Onde está a letra I na palavra Peixe?"),
    ("hunt_success_peixe", "Muito bem! Encontraste a letra I na palavra Peixe!"),

    ("hunt_prompt_livro", "Onde está a letra I na palavra Livro?"),
    ("hunt_success_livro", "Muito bem! Encontraste a letra I na palavra Livro!"),

    ("hunt_prompt_rainha", "Onde está a letra I na palavra Rainha?"),
    ("hunt_success_rainha", "Muito bem! Encontraste a letra I na palavra Rainha!"),

    ("hunt_prompt_biscoito", "A palavra Biscoito tem duas letras I! Consegues encontrar as duas?"),
    ("hunt_success_biscoito", "Fantástico! Encontraste as duas letras I no Biscoito!"),

    ("hunt_prompt_lua", "Onde está a letra U na palavra Lua?"),
    ("hunt_success_lua", "Muito bem! Encontraste a letra U na palavra Lua!"),

    ("hunt_prompt_nuvem", "Onde está a letra U na palavra Nuvem?"),
    ("hunt_success_nuvem", "Muito bem! Encontraste a letra U na palavra Nuvem!"),

    ("hunt_prompt_coruja", "Onde está a letra U na palavra Coruja?"),
    ("hunt_success_coruja", "Muito bem! Encontraste a letra U na palavra Coruja!"),

    ("hunt_prompt_tartaruga", "Onde está a letra U na palavra Tartaruga?"),
    ("hunt_success_tartaruga", "Muito bem! Encontraste a letra U na Tartaruga!"),

    ("hunt_prompt_ui", "Onde está a combinação UI na palavra Ui?"),
    ("hunt_success_ui", "Muito bem! Encontraste a combinação UI!"),

    ("hunt_prompt_uivo", "Onde está o UI na palavra Uivo?"),
    ("hunt_success_uivo", "Muito bem! Encontraste a combinação UI no Uivo!"),

    ("hunt_prompt_cuidado", "Onde está o UI na palavra Cuidado?"),
    ("hunt_success_cuidado", "Muito bem! Encontraste o UI na palavra Cuidado!"),

    ("hunt_prompt_fui", "Consegues encontrar o UI na palavra Fui?"),
    ("hunt_success_fui", "Muito bem! Encontraste a combinação UI no Fui!"),

    ("hunt_prompt_viu", "Onde está o IU na palavra Viu?"),
    ("hunt_success_viu", "Muito bem! Encontraste a combinação IU na palavra Viu!"),

    ("hunt_prompt_riu", "Onde está o IU na palavra Riu?"),
    ("hunt_success_riu", "Muito bem! Encontraste a combinação IU na palavra Riu!"),

    ("hunt_prompt_subiu", "Consegues encontrar o IU na palavra Subiu?"),
    ("hunt_success_subiu", "Muito bem! Encontraste o IU na palavra Subiu!"),

    ("hunt_prompt_fugiu", "Onde está o IU na palavra Fugiu?"),
    ("hunt_success_fugiu", "Muito bem! Encontraste o IU na palavra Fugiu!"),

    ("hunt_prompt_gato", "Onde está a letra A na palavra Gato?"),
    ("hunt_success_gato", "Muito bem! Encontraste a letra A no Gato!"),

    ("hunt_prompt_barco", "Onde está a letra A na palavra Barco?"),
    ("hunt_success_barco", "Muito bem! Encontraste a letra A no Barco!"),

    ("hunt_prompt_casa", "A palavra Casa tem duas letras A! Encontra as duas letras A!"),
    ("hunt_success_casa", "Fantástico! Encontraste as duas letras A na Casa!"),

    ("hunt_prompt_banana", "A palavra Banana tem três letras A! Toca em todas as letras A!"),
    ("hunt_success_banana", "Espetacular! Encontraste as três letras A na Banana!"),

    ("hunt_prompt_vela", "Onde está a letra E na palavra Vela?"),
    ("hunt_success_vela", "Muito bem! Encontraste a letra E na Vela!"),

    ("hunt_prompt_coelho", "Onde está a letra E na palavra Coelho?"),
    ("hunt_success_coelho", "Muito bem! Encontraste a letra E no Coelho!"),

    ("hunt_prompt_dente", "A palavra Dente tem duas letras E! Consegues tocar nas duas letras E?"),
    ("hunt_success_dente", "Fantástico! Encontraste as duas letras E no Dente!"),

    ("hunt_prompt_estrela", "Toca em todas as letras E na palavra Estrela!"),
    ("hunt_success_estrela", "Muito bem! Encontraste as letras E na Estrela!"),

    # --- FRASES COMPLETAS: BUBBLE GAME (MISSÃO E CONCLUSÃO) ---
    ("bubble_mission_i", "Ajuda o Dino a rebentar todas as bolhas com a letra I!"),
    ("bubble_complete_i", "Muito bem! Apanhaste todas as bolhas da letra I!"),

    ("bubble_mission_u", "Ajuda o Dino a rebentar todas as bolhas com a letra U!"),
    ("bubble_complete_u", "Muito bem! Apanhaste todas as bolhas da letra U!"),

    ("bubble_mission_ui", "Ajuda o Dino a rebentar todas as bolhas com a combinação UI!"),
    ("bubble_complete_ui", "Muito bem! Apanhaste todas as bolhas com a combinação UI!"),

    ("bubble_mission_iu", "Ajuda o Dino a rebentar todas as bolhas com a combinação IU!"),
    ("bubble_complete_iu", "Muito bem! Apanhaste todas as bolhas com a combinação IU!"),

    ("bubble_mission_a", "Ajuda o Dino a rebentar todas as bolhas com a letra A!"),
    ("bubble_complete_a", "Muito bem! Apanhaste todas as bolhas da letra A!"),

    ("bubble_mission_e", "Ajuda o Dino a rebentar todas as bolhas com a letra E!"),
    ("bubble_complete_e", "Muito bem! Apanhaste todas as bolhas da letra E!"),

    # --- FRASES COMPLETAS: TRACE GAME (DICAS CURSIVAS) ---
    ("trace_hint_i_lower", "Sobe com a perninha, desce e faz a curva... e não te esqueças do pingo no i!"),
    ("trace_hint_i_upper", "Faz a voltinha no cimo, desce a haste e curva na base!"),
    ("trace_hint_i_dot", "Muito bem! Agora toca no ponto para pôr o pingo no i!"),

    ("trace_hint_u_lower", "Faz duas ondinhas de mão dada: sobe, desce, faz baloiço, sobe e desce com a perninha!"),
    ("trace_hint_u_upper", "Começa com a voltinha cá em cima, desce, faz uma curva larga e sobe!"),

    ("trace_hint_a_lower", "Sobe com a perninha, faz a volta redondinha, fecha e puxa a perninha para fora!"),
    ("trace_hint_a_upper", "Sobe a montanha, desce pelo outro lado e faz o laço no meio!"),

    ("trace_hint_e_lower", "Sobe com o dedinho, dá a volta em laço e faz a perninha de saída!"),
    ("trace_hint_e_upper", "Faz uma voltinha no cimo, um lacinho ao meio e uma voltinha maior em baixo!"),
    ("trace_success", "Parabéns! Traçaste a letra cursiva perfeitamente!"),

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
