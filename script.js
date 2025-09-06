      // Função para renderizar os ícones do Lucide
      lucide.createIcons();

      // --- Dados da Aplicação ---
      const chapters = [
        { id: 1, title: "A Crise das 'Escolas'", subtitle: "Por que precisamos de uma nova síntese" },
        { id: 2, title: "O Movimento da Psicoterapia Integrativa", subtitle: "Uma breve história e suas vias" },
        { id: 3, title: "A Teoria da Emoção Construída", subtitle: "O alicerce científico inabalável do Modelo VIP" },
        { id: 4, title: "Vínculo", subtitle: "Co-regulação e reparentalização" },
        { id: 5, title: "Imagem", subtitle: "Reconsolidação da memória e simulação mental" },
        { id: 6, title: "Palavra", subtitle: "Granularidade emocional e construção narrativa" },
        { id: 7, title: "Avaliação e Conceituação de Caso", subtitle: "Integrando os três pilares na prática clínica" },
        { id: 8, title: "Protocolos de Tratamento", subtitle: "Integração sinérgica dos três pilares" },
        { id: 9, title: "A Formação do Terapeuta VIP", subtitle: "Competências, treinamento e desenvolvimento" },
        { id: 10, title: "Pesquisa e Evidências Empíricas", subtitle: "Validação científica do Modelo VIP" }
      ];

      const appendices = [
        { id: 'A', title: "Instrumentos de Avaliação e Conceituação VIP" },
        { id: 'B', title: "Protocolos de Intervenção Detalhados" },
        { id: 'C', title: "Recursos e Exercícios para Pacientes" },
        { id: 'D', title: "Guias de Supervisão e Treinamento" },
        { id: 'E', title: "Formulários e Documentação Clínica" },
        { id: 'F', title: "Glossário do Modelo VIP" }
      ];

      // --- Lógica de Renderização Dinâmica ---
      const chaptersGrid = document.getElementById('chapters-grid');
      chapters.forEach(chapter => {
        const card = `
          <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6">
            <h3 class="flex items-center font-bold text-gray-800">
              <i data-lucide="book-open" class="w-5 h-5 mr-2 text-indigo-600"></i>
              Capítulo ${chapter.id}
            </h3>
            <p class="text-lg font-semibold text-gray-900 mt-2">${chapter.title}</p>
            <p class="text-gray-600 mt-1">${chapter.subtitle}</p>
          </div>
        `;
        chaptersGrid.innerHTML += card;
      });

      const appendicesGrid = document.getElementById('appendices-grid');
      appendices.forEach(appendix => {
        const card = `
          <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6">
            <h3 class="font-bold text-gray-800 text-center">Apêndice ${appendix.id}</h3>
            <p class="text-gray-600 text-center mt-2">${appendix.title}</p>
          </div>
        `;
        appendicesGrid.innerHTML += card;
      });

      // --- Lógica de Interatividade ---
      
      // Menu Mobile
      const menuButton = document.getElementById('menu-button');
      const mobileMenu = document.getElementById('mobile-menu');
      const menuIconOpen = document.getElementById('menu-icon-open');
      const menuIconClose = document.getElementById('menu-icon-close');
      const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

      const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden');
        menuIconOpen.classList.toggle('hidden');
        menuIconClose.classList.toggle('hidden');
        const isMenuOpen = !mobileMenu.classList.contains('hidden');
        menuButton.setAttribute('aria-label', isMenuOpen ? 'Fechar menu' : 'Abrir menu');
      };

      menuButton.addEventListener('click', toggleMenu);
      mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
      });

      // Função de Download do PDF
      const handleDownloadPDF = () => {
        const link = document.createElement('a');
        
        // Link de download direto para o arquivo no Google Drive
        link.href = 'https://drive.google.com/uc?export=download&id=10rxEe0CbPkEiLeIzGY2wU0WzENKyWwg-';

        // Define o nome do arquivo que o usuário verá ao salvar
        link.download = 'Modelo_VIP_Livro_Completo.pdf';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      
      // Adiciona o evento de clique aos botões de download
      document.getElementById('download-pdf-hero').addEventListener('click', handleDownloadPDF);
      document.getElementById('download-pdf-footer').addEventListener('click', handleDownloadPDF);

    

