import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { BookOpen, Brain, Heart, MessageCircle, Download, Menu, X } from 'lucide-react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
  ]

  const appendices = [
    { id: 'A', title: "Instrumentos de Avaliação e Conceituação VIP" },
    { id: 'B', title: "Protocolos de Intervenção Detalhados" },
    { id: 'C', title: "Recursos e Exercícios para Pacientes" },
    { id: 'D', title: "Guias de Supervisão e Treinamento" },
    { id: 'E', title: "Formulários e Documentação Clínica" },
    { id: 'F', title: "Glossário do Modelo VIP" }
  ]

  const handleDownloadPDF = () => {
    const link = document.createElement('a')
    link.href = '/LivroModeloVIP_final_numbered_formatted.pdf'
    link.download = 'Modelo_VIP_Livro_Completo.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDownloadMarkdown = () => {
    const link = document.createElement('a')
    link.href = '/LivroModeloVIP_final.md'
    link.download = 'Modelo_VIP_Livro_Completo.md'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-indigo-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Modelo VIP</h1>
                <p className="text-sm text-gray-600">A Nova Síntese em Psicoterapia</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#sobre" className="text-gray-700 hover:text-indigo-600 transition-colors">Sobre</a>
              <a href="#capitulos" className="text-gray-700 hover:text-indigo-600 transition-colors">Capítulos</a>
              <a href="#apendices" className="text-gray-700 hover:text-indigo-600 transition-colors">Apêndices</a>
              <a href="#download" className="text-gray-700 hover:text-indigo-600 transition-colors">Download</a>
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <nav className="flex flex-col space-y-2">
                <a href="#sobre" className="text-gray-700 hover:text-indigo-600 transition-colors py-2">Sobre</a>
                <a href="#capitulos" className="text-gray-700 hover:text-indigo-600 transition-colors py-2">Capítulos</a>
                <a href="#apendices" className="text-gray-700 hover:text-indigo-600 transition-colors py-2">Apêndices</a>
                <a href="#download" className="text-gray-700 hover:text-indigo-600 transition-colors py-2">Download</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Modelo VIP
          </h1>
          <h2 className="text-2xl md:text-3xl text-indigo-600 mb-8">
            A Nova Síntese em Psicoterapia
          </h2>
          <p className="text-xl text-gray-700 mb-12 leading-relaxed">
            Vínculo, Imagem e Palavra à Luz da Teoria da Emoção Construída
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Heart className="w-5 h-5 mr-2" />
              Vínculo
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Brain className="w-5 h-5 mr-2" />
              Imagem
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <MessageCircle className="w-5 h-5 mr-2" />
              Palavra
            </Badge>
          </div>

          <Button 
            size="lg" 
            className="text-lg px-8 py-4"
            onClick={handleDownloadPDF}
          >
            <Download className="w-5 h-5 mr-2" />
            Baixar PDF Completo
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Sobre o Modelo VIP</h2>
          <div className="prose prose-lg mx-auto text-gray-700">
            <p className="text-xl leading-relaxed mb-6">
              Vivemos um momento extraordinário na história da psicologia e neurociência. Após décadas de fragmentação teórica e disputas entre escolas de pensamento, uma revolução silenciosa está transformando nossa compreensão fundamental sobre a natureza humana.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Esta revolução não vem de uma nova técnica terapêutica ou de mais uma teoria psicológica, mas de uma descoberta científica que está redefinindo nossa compreensão mais básica sobre o que significa ser humano: as emoções não são reações universais e automáticas, mas construções ativas e individualizadas do cérebro.
            </p>
            <p className="text-lg leading-relaxed">
              É neste contexto revolucionário que nasce o Modelo VIP - uma síntese inovadora que traduz os insights da Teoria da Emoção Construída em uma abordagem prática e integrativa de psicoterapia.
            </p>
          </div>
        </div>
      </section>

      {/* Chapters Section */}
      <section id="capitulos" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Capítulos</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {chapters.map((chapter) => (
              <Card key={chapter.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                    Capítulo {chapter.id}
                  </CardTitle>
                  <CardDescription className="text-lg font-semibold text-gray-900">
                    {chapter.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{chapter.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Appendices Section */}
      <section id="apendices" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Apêndices - Recursos Práticos</h2>
          <p className="text-center text-lg text-gray-600 mb-8">
            Da compreensão à implementação profissional
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appendices.map((appendix) => (
              <Card key={appendix.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-center">
                    Apêndice {appendix.id}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{appendix.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Acesse o Livro Completo
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Baixe o PDF completo com formatação profissional, numeração de páginas e sumário dinâmico.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-4"
              onClick={handleDownloadPDF}
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-indigo-600"
              onClick={handleDownloadMarkdown}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Versão Markdown
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="h-6 w-6 text-indigo-400" />
                <h3 className="text-lg font-semibold">Modelo VIP</h3>
              </div>
              <p className="text-gray-400">
                A Nova Síntese em Psicoterapia baseada na Teoria da Emoção Construída.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Autor</h3>
              <p className="text-gray-400">
                Carlos Sérgio Honorato de Oliveira
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <p className="text-gray-400">
                Para mais informações sobre o Modelo VIP e formação profissional.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Modelo VIP. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

