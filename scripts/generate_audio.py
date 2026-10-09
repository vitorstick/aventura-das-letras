import os
import sys
import json
import hashlib
import asyncio
import edge_tts

VOICE = "pt-PT-RaquelNeural"
RATE = "-4%" # Cadência suave e límpida para crianças de 6 anos
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "audio")
MANIFEST_PATH = os.path.join(OUTPUT_DIR, "manifest.json")

# Catálogo completo de áudios educativos em pt-PT com calibração fonológica rigorosa
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

    ("letter_name_ui", "Combinação U I... ui!"),
    ("letter_sound_ui", "ui"),
    ("letter_intro_ui", "Fantástico! Vamos juntar as letras U e I para fazer ui! Ouve como faz: ui!"),
    ("letter_card_ui", "Esta é a combinação U I! U mais I faz: ui!"),

    ("letter_name_iu", "Combinação I U... iu!"),
    ("letter_sound_iu", "iu"),
    ("letter_intro_iu", "Que maravilha! Agora juntamos o I e o U para fazer iu! Ouve como faz: iu!"),
    ("letter_card_iu", "Esta é a combinação I U! I mais U faz: iu!"),

    # P1.1: Uso explícito de acento para garantir a vogal aberta [a] e [ɛ], evitando artigos/conjunções
    ("letter_name_a", "Letra Á"),
    ("letter_sound_a", "Á"),
    ("letter_intro_a", "Viva! Vamos aprender a letra Á! Ouve como faz: Á!"),
    ("letter_card_a", "Esta é a letra Á! Faz o som: Á!"),

    ("letter_name_e", "Letra É"),
    ("letter_sound_e", "É"),
    ("letter_intro_e", "Espetacular! Esta é a letra É! Ouve como faz: É!"),
    ("letter_card_e", "Esta é a letra É! Faz o som: É!"),

    # --- PALAVRAS DO EXPLORADOR (NOME CURTO E FRASE COMPLETA) ---
    # Letra I
    ("word_only_ilha", "Ilha"),
    ("word_phrase_ilha", "I de Ilha! Uma ilha no meio do mar!"),
    ("word_only_igreja", "Igreja"),
    ("word_phrase_igreja", "I de Igreja! A torre da igreja!"),
    ("word_only_iman", "Íman"),
    ("word_phrase_iman", "I de Íman! Um íman forte que puxa o metal!"),
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

    # Combinação UI (P1.3: grafia "ui" na fala para pronúncia do ditongo fundido)
    ("word_only_ui", "Ui!"),
    ("word_phrase_ui", "Ui! Que susto apanhou o Dino!"),
    ("word_only_uivo", "Uivo"),
    ("word_phrase_uivo", "ui em Uivo! O lobo a uivar à lua no bosque!"),
    ("word_only_cuidado", "Cuidado"),
    ("word_phrase_cuidado", "ui em Cuidado! Olha com atenção para não tropeçar!"),
    ("word_only_fui", "Fui"),
    ("word_phrase_fui", "ui em Fui! Fui dar um passeio com o Dino pelo parque!"),

    # Combinação IU (P1.3: grafia "iu" na fala para pronúncia do ditongo fundido)
    ("word_only_viu", "Viu"),
    ("word_phrase_viu", "iu em Viu! O Dino viu um ninho de passarinhos!"),
    ("word_only_riu", "Riu"),
    ("word_phrase_riu", "iu em Riu! O Dino riu muito com uma cócega divertida!"),
    ("word_only_subiu", "Subiu"),
    ("word_phrase_subiu", "iu em Subiu! O macaco subiu à árvore bem depressa!"),
    ("word_only_fugiu", "Fugiu"),
    ("word_phrase_fugiu", "iu em Fugiu! O coelhinho fugiu a saltitar pela relva!"),

    # Letra A
    ("word_only_arvore", "Árvore"),
    ("word_phrase_arvore", "Á de Árvore! Uma árvore grande com folhas verdes!"),
    ("word_only_agua", "Água"),
    ("word_phrase_agua", "Á de Água! Uma gota de água fresquinha!"),
    ("word_only_asa", "Asa"),
    ("word_phrase_asa", "Á de Asa! A asa rápida do passarinho!"),
    ("word_only_aviao", "Avião"),
    ("word_phrase_aviao", "Á de Avião! O avião a voar alto nas nuvens!"),

    # Letra E
    ("word_only_egua", "Égua"),
    ("word_phrase_egua", "É de Égua! Uma égua bonita a correr no prado!"),
    ("word_only_eco", "Eco"),
    ("word_phrase_eco", "É de Eco! Ouve o som a repetir... é o eco!"),
    ("word_only_estrela", "Estrela"),
    ("word_phrase_estrela", "É de Estrela! Uma estrela brilhante no céu!"),
    ("word_only_elefante", "Elefante"),
    ("word_phrase_elefante", "É de Elefante! Um grande elefante com orelhas compridas!"),

    # --- PALAVRAS DO WORD HUNT ("DETETIVE") ---
    ("word_only_peixe", "Peixe"),
    ("word_only_livro", "Livro"),
    ("word_only_rainha", "Rainha"),
    ("word_only_biscoito", "Biscoito"),
    ("word_only_lua", "Lua"),
    ("word_only_nuvem", "Nuvem"),
    ("word_only_coruja", "Coruja"),
    ("word_only_luva", "Luva"),
    ("word_only_tartaruga", "Tartaruga"),
    ("word_only_gato", "Gato"),
    ("word_only_barco", "Barco"),
    ("word_only_casa", "Casa"),
    ("word_only_banana", "Banana"),
    ("word_only_vela", "Vela"),
    ("word_only_coelho", "Coelho"),
    ("word_only_dente", "Dente"),

    # --- FRASES COMPLETAS: QUIZ GAME (P1.1 e P1.3 ajustados) ---
    ("quiz_prompt_ui", "Ui, que susto! Que combinação é esta? ui, iu, U ou I?"),
    ("quiz_success_ui", "Certo! Muito bem, é a combinação ui!"),
    ("quiz_tryagain_ui", "Quase! Esta é a combinação ui!"),

    ("quiz_prompt_uivo", "Uivo do lobo... começa por que combinação? ui, iu, U ou I?"),
    ("quiz_success_uivo", "Certo! Uivo começa com a combinação ui!"),
    ("quiz_tryagain_uivo", "Quase! A palavra Uivo começa com ui!"),

    ("quiz_prompt_viu", "Ele viu! A palavra Viu termina com que combinação? iu, ui, I ou U?"),
    ("quiz_success_viu", "Certo! A palavra Viu termina com iu!"),
    ("quiz_tryagain_viu", "Quase! A palavra Viu termina com iu!"),

    ("quiz_prompt_riu", "Ele riu! A palavra Riu termina com que combinação? iu, ui, I ou U?"),
    ("quiz_success_riu", "Certo! A palavra Riu termina com iu!"),
    ("quiz_tryagain_riu", "Quase! A palavra Riu termina com iu!"),

    ("quiz_prompt_arvore", "Árvore... começa com que letra? Á, É, I ou U?"),
    ("quiz_success_arvore", "Certo! Árvore começa com a letra Á!"),
    ("quiz_tryagain_arvore", "Quase! Árvore começa com a letra Á!"),

    ("quiz_prompt_egua", "Égua... começa com que letra? Á, É, I ou U?"),
    ("quiz_success_egua", "Certo! Égua começa com a letra É!"),
    ("quiz_tryagain_egua", "Quase! Égua começa com a letra É!"),

    ("quiz_prompt_ilha", "Ilha... começa com que letra? Á, É, I ou U?"),
    ("quiz_success_ilha", "Certo! Ilha começa com a letra I!"),
    ("quiz_tryagain_ilha", "Quase! Ilha começa com a letra I!"),

    ("quiz_prompt_uvas", "Uvas... começa com que letra? Á, É, I ou U?"),
    ("quiz_success_uvas", "Certo! Uvas começa com a letra U!"),
    ("quiz_tryagain_uvas", "Quase! Uvas começa com a letra U!"),

    ("quiz_prompt_agua", "Água... começa com que letra? Á, É, I ou U?"),
    ("quiz_success_agua", "Certo! Água começa com a letra Á!"),
    ("quiz_tryagain_agua", "Quase! Água começa com a letra Á!"),

    ("quiz_prompt_eco", "Eco... começa com que letra? Á, É, I ou U?"),
    ("quiz_success_eco", "Certo! Eco começa com a letra É!"),
    ("quiz_tryagain_eco", "Quase! Eco começa com a letra É!"),

    ("quiz_prompt_urso", "Urso... começa com que letra? Á, É, I ou U?"),
    ("quiz_success_urso", "Certo! Urso começa com a letra U!"),
    ("quiz_tryagain_urso", "Quase! Urso começa com a letra U!"),

    ("quiz_prompt_iman", "Íman... começa com que letra? Á, É, I ou U?"),
    ("quiz_success_iman", "Certo! Íman começa com a letra I!"),
    ("quiz_tryagain_iman", "Quase! Íman começa com a letra I!"),

    ("quiz_prompt_asa", "Asa... começa com que letra? Á, É, I ou U?"),
    ("quiz_success_asa", "Certo! Asa começa com a letra Á!"),
    ("quiz_tryagain_asa", "Quase! Asa começa com a letra Á!"),

    ("quiz_prompt_estrela", "Estrela... começa com que letra? Á, É, I ou U?"),
    ("quiz_success_estrela", "Certo! Estrela começa com a letra É!"),
    ("quiz_tryagain_estrela", "Quase! Estrela começa com a letra É!"),

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

    ("hunt_prompt_luva", "Onde está a letra U na palavra Luva?"),
    ("hunt_success_luva", "Muito bem! Encontraste a letra U na Luva!"),

    ("hunt_prompt_tartaruga", "Onde está a letra U na palavra Tartaruga?"),
    ("hunt_success_tartaruga", "Muito bem! Encontraste a letra U na Tartaruga!"),

    ("hunt_prompt_ui", "Onde está a combinação ui na palavra Ui?"),
    ("hunt_success_ui", "Muito bem! Encontraste a combinação ui!"),

    ("hunt_prompt_uivo", "Onde está o ui na palavra Uivo?"),
    ("hunt_success_uivo", "Muito bem! Encontraste a combinação ui no Uivo!"),

    ("hunt_prompt_cuidado", "Onde está o ui na palavra Cuidado?"),
    ("hunt_success_cuidado", "Muito bem! Encontraste o ui no Cuidado!"),

    ("hunt_prompt_fui", "Consegues encontrar o ui na palavra Fui?"),
    ("hunt_success_fui", "Muito bem! Encontraste a combinação ui no Fui!"),

    ("hunt_prompt_viu", "Onde está o iu na palavra Viu?"),
    ("hunt_success_viu", "Muito bem! Encontraste a combinação iu na palavra Viu!"),

    ("hunt_prompt_riu", "Onde está o iu na palavra Riu?"),
    ("hunt_success_riu", "Muito bem! Encontraste a combinação iu na palavra Riu!"),

    ("hunt_prompt_subiu", "Consegues encontrar o iu na palavra Subiu?"),
    ("hunt_success_subiu", "Muito bem! Encontraste o iu no Subiu!"),

    ("hunt_prompt_fugiu", "Onde está o iu na palavra Fugiu?"),
    ("hunt_success_fugiu", "Muito bem! Encontraste o iu no Fugiu!"),

    ("hunt_prompt_gato", "Onde está a letra Á na palavra Gato?"),
    ("hunt_success_gato", "Muito bem! Encontraste a letra Á no Gato!"),

    ("hunt_prompt_barco", "Onde está a letra Á na palavra Barco?"),
    ("hunt_success_barco", "Muito bem! Encontraste a letra Á no Barco!"),

    ("hunt_prompt_casa", "A palavra Casa tem duas letras Á! Encontra as duas letras Á!"),
    ("hunt_success_casa", "Fantástico! Encontraste as duas letras Á na Casa!"),

    ("hunt_prompt_banana", "A palavra Banana tem três letras Á! Toca em todas as letras Á!"),
    ("hunt_success_banana", "Espetacular! Encontraste as três letras Á na Banana!"),

    ("hunt_prompt_vela", "Onde está a letra É na palavra Vela?"),
    ("hunt_success_vela", "Muito bem! Encontraste a letra É na Vela!"),

    ("hunt_prompt_coelho", "Onde está a letra É na palavra Coelho?"),
    ("hunt_success_coelho", "Muito bem! Encontraste a letra É no Coelho!"),

    ("hunt_prompt_dente", "A palavra Dente tem duas letras É! Consegues tocar nas duas letras É?"),
    ("hunt_success_dente", "Fantástico! Encontraste as duas letras É no Dente!"),

    ("hunt_prompt_estrela", "Toca em todas as letras É na palavra Estrela!"),
    ("hunt_success_estrela", "Muito bem! Encontraste as letras É na Estrela!"),

    # --- FRASES COMPLETAS: BUBBLE GAME ---
    ("bubble_mission_i", "Ajuda o Dino a rebentar todas as bolhas com a letra I!"),
    ("bubble_complete_i", "Muito bem! Apanhaste todas as bolhas da letra I!"),

    ("bubble_mission_u", "Ajuda o Dino a rebentar todas as bolhas com a letra U!"),
    ("bubble_complete_u", "Muito bem! Apanhaste todas as bolhas da letra U!"),

    ("bubble_mission_ui", "Ajuda o Dino a rebentar todas as bolhas com a combinação ui!"),
    ("bubble_complete_ui", "Muito bem! Apanhaste todas as bolhas da combinação ui!"),

    ("bubble_mission_iu", "Ajuda o Dino a rebentar todas as bolhas com a combinação iu!"),
    ("bubble_complete_iu", "Muito bem! Apanhaste todas as bolhas da combinação iu!"),

    ("bubble_mission_a", "Ajuda o Dino a rebentar todas as bolhas com a letra Á!"),
    ("bubble_complete_a", "Muito bem! Apanhaste todas as bolhas da letra Á!"),

    ("bubble_mission_e", "Ajuda o Dino a rebentar todas as bolhas com a letra É!"),
    ("bubble_complete_e", "Muito bem! Apanhaste todas as bolhas da letra É!"),

    # --- FRASES COMPLETAS: TRACE GAME ---
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

    # --- SOLETRAÇÃO FONOLÓGICA DAS LETRAS DO ALFABETO (P1.1 e P1.5) ---
    ("spell_a", "Á"),
    ("spell_b", "Bê"),
    ("spell_c", "Cê"),
    ("spell_cedilla_c", "Cê cedilhado"),
    ("spell_d", "Dê"),
    ("spell_e", "É"),
    ("spell_f", "Éfe"),
    ("spell_g", "Gê"),
    ("spell_h", "Agá"),
    ("spell_i", "I"),
    ("spell_j", "Jota"),
    ("spell_k", "Capa"),
    ("spell_l", "Éle"),
    ("spell_m", "Ême"),
    ("spell_n", "Êne"),
    ("spell_o", "Ó"),
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
    ("spell_circumflex_o", "Ô"),
    ("spell_acute_u", "Ú"),

    # --- REFORÇOS POSITIVOS E INCENTIVOS ---
    ("feedback_bravo", "Muito bem! Excelente!"),
    ("feedback_certo", "Certo! Parabéns!"),
    ("feedback_quase", "Quase! Tenta outra vez!"),
    ("feedback_soletrar", "Vamos soletrar a palavra!")
]

def get_hash(text: str) -> str:
    payload = f"{text}|{VOICE}|{RATE}"
    return hashlib.sha1(payload.encode("utf-8")).hexdigest()

def load_manifest() -> dict:
    if os.path.exists(MANIFEST_PATH):
        try:
            with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def save_manifest(manifest: dict):
    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

async def generate_single(name: str, text: str, manifest: dict, force: bool = False):
    file_path = os.path.join(OUTPUT_DIR, f"{name}.mp3")
    h = get_hash(text)

    # Se já existe o ficheiro e o hash não mudou, pula (salvo se --force)
    if not force and os.path.exists(file_path) and os.path.getsize(file_path) > 500 and manifest.get(name) == h:
        return

    print(f"A gerar: {name}.mp3 -> '{text}'")
    communicator = edge_tts.Communicate(text, VOICE, rate=RATE)
    await communicator.save(file_path)
    manifest[name] = h

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    force = "--force" in sys.argv
    manifest = load_manifest()

    semaphore = asyncio.Semaphore(4)

    async def sem_task(name, text):
        async with semaphore:
            for attempt in range(3):
                try:
                    await generate_single(name, text, manifest, force)
                    break
                except Exception as e:
                    print(f"Erro em {name} (tentativa {attempt + 1}): {e}")
                    await asyncio.sleep(1)

    tasks = [sem_task(name, text) for name, text in AUDIO_ITEMS]
    await asyncio.gather(*tasks)

    save_manifest(manifest)
    print(f"\nConcluído! Todos os {len(AUDIO_ITEMS)} ficheiros de áudio gerados/atualizados em '{OUTPUT_DIR}'.")

if __name__ == "__main__":
    asyncio.run(main())
