import { useState } from "react";
import { Download, Users, Target, TrendingUp, Filter, ArrowUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Sidebar from "@/components/Sidebar";
import CandidateFilters from "@/components/candidates/CandidateFilters";
import CandidateCard, { type Candidate } from "@/components/candidates/CandidateCard";
import CandidateModal from "@/components/candidates/CandidateModal";
import { useToast } from "@/hooks/use-toast";
import { useSidebarState } from "@/hooks/useSidebarState";

// Mock data for candidates
const mockCandidates: Candidate[] = [
  {
    id: 1,
    name: "Gabriela Moura",
    position: "Gestor de Ativos",
    score: 92,
    status: "pending",
    hasLinkedin: true,
    tags: ["React", "TypeScript", "Senior"],
    photo: null,
    linkedin: "https://linkedin.com/in/ana-silva",
    insights: "Excelente experiência em React e TypeScript. Forte background em UX/UI. Trabalhou em startups de tecnologia por 5+ anos.",
    cv: "ana-silva-cv.pdf",
    history: [
      { date: "2024-01-15", action: "CV Processado", details: "Score inicial: 92" },
      { date: "2024-01-16", action: "Aguardando Agendamento", details: "Qualificado para entrevista" }
    ]
  },
  {
    id: 2,
    name: "Fernanda Souza",
    position: "Gestor de Ativos",
    score: 88,
    status: "contacted",
    hasLinkedin: true,
    tags: ["AWS", "Docker", "Kubernetes"],
    photo: null,
    linkedin: "https://linkedin.com/in/carlos-santos",
    insights: "Especialista em infraestrutura cloud. Experiência sólida com AWS e containers. Bom histórico de otimização de processos.",
    cv: "carlos-santos-cv.pdf",
    history: [
      { date: "2024-01-10", action: "CV Processado", details: "Score inicial: 88" },
      { date: "2024-01-12", action: "Convite Enviado", details: "Email enviado às 14:30" },
      { date: "2024-01-14", action: "Agendamento Realizado", details: "Entrevista marcada para 20/01" }
    ]
  },
  {
    id: 3,
    name: "Agatha Moreira",
    position: "Analista de Crédito",
    score: 85,
    status: "scheduled",
    hasLinkedin: true,
    tags: ["Agile", "Scrum", "Product"],
    photo: null,
    linkedin: "https://linkedin.com/in/maria-oliveira",
    insights: "Forte experiência em gestão de produtos digitais. Trabalhou em empresas de médio e grande porte. Excelente comunicação.",
    cv: "maria-oliveira-cv.pdf",
    history: [
      { date: "2024-01-08", action: "CV Processado", details: "Score inicial: 85" },
      { date: "2024-01-09", action: "Convite Enviado", details: "Email enviado às 10:15" },
      { date: "2024-01-11", action: "Agendamento Realizado", details: "Entrevista agendada para 18/01" }
    ]
  },
  {
    id: 4,
    name: "Rafael Antunes",
    position: "Gestor de Ativos",
    score: 79,
    status: "rejected",
    hasLinkedin: false,
    tags: ["Python", "Django", "Mid"],
    photo: null,
    linkedin: null,
    insights: "Boa experiência técnica mas falta experiência em projetos de grande escala. Conhecimento sólido em Python.",
    cv: "pedro-lima-cv.pdf",
    history: [
      { date: "2024-01-05", action: "CV Processado", details: "Score inicial: 79" },
      { date: "2024-01-06", action: "Não Qualificado", details: "Score abaixo do critério mínimo" }
    ]
  },
  {
    id: 5,
    name: "Paulo Martins",
    position: "Gestor de Ativos",
    score: 94,
    status: "pending",
    hasLinkedin: true,
    tags: ["Figma", "Design System", "Senior"],
    photo: null,
    linkedin: "https://linkedin.com/in/juliana-costa",
    insights: "Designer excepcional com portfolio impressionante. Experiência em design systems e metodologias ágeis.",
    cv: "juliana-costa-cv.pdf",
    history: [
      { date: "2024-01-18", action: "CV Processado", details: "Score inicial: 94" }
    ]
  },
  {
    id: 6,
    name: "Fernanda Christine",
    position: "Gerente de Relacionamento",
    score: 91,
    status: "contacted",
    hasLinkedin: true,
    tags: ["Python", "ML", "AI"],
    photo: null,
    linkedin: "https://linkedin.com/in/roberto-ferreira",
    insights: "Especialista em machine learning com PhD em Ciência da Computação. Publicações em conferências internacionais.",
    cv: "roberto-ferreira-cv.pdf",
    history: [
      { date: "2024-01-17", action: "CV Processado", details: "Score inicial: 91" },
      { date: "2024-01-18", action: "Convite Enviado", details: "Email enviado às 16:45" }
    ]
  },
  // Candidatos adicionais - Qualificados (score >= 85)
  {
    id: 7,
    name: "Marcos Paulo",
    position: "Especialista em Investimentos",
    score: 87,
    status: "pending",
    hasLinkedin: true,
    tags: ["Node.js", "React", "MongoDB"],
    photo: null,
    linkedin: "https://linkedin.com/in/lucas-pereira",
    insights: "Desenvolvedor versátil com experiência em stack completa. Forte em arquitetura de sistemas.",
    cv: "lucas-pereira-cv.pdf",
    history: [
      { date: "2024-01-19", action: "CV Processado", details: "Score inicial: 87" }
    ]
  },
  {
    id: 8,
    name: "Lucas Cazzin",
    position: "Gestor de Ativos",
    score: 89,
    status: "contacted",
    hasLinkedin: true,
    tags: ["Selenium", "Cypress", "Automation"],
    photo: null,
    linkedin: "https://linkedin.com/in/fernanda-silva",
    insights: "Especialista em testes automatizados com foco em qualidade de software.",
    cv: "fernanda-silva-cv.pdf",
    history: [
      { date: "2024-01-18", action: "CV Processado", details: "Score inicial: 89" },
      { date: "2024-01-19", action: "Convite Enviado", details: "Email enviado às 11:20" }
    ]
  },
  {
    id: 9,
    name: "Marina Zuck",
    position: "Especialista em Investimentos",
    score: 86,
    status: "scheduled",
    hasLinkedin: true,
    tags: ["React Native", "Flutter", "Mobile"],
    photo: null,
    linkedin: "https://linkedin.com/in/rafael-costa",
    insights: "Desenvolvedor mobile experiente com apps publicados nas lojas.",
    cv: "rafael-costa-cv.pdf",
    history: [
      { date: "2024-01-20", action: "CV Processado", details: "Score inicial: 86" },
      { date: "2024-01-21", action: "Entrevista Agendada", details: "Para 25/01 às 15:00" }
    ]
  },
  {
    id: 10,
    name: "Ricardo Pereira",
    position: "Gestor de Ativos",
    score: 90,
    status: "pending",
    hasLinkedin: true,
    tags: ["Figma", "Adobe XD", "Design System"],
    photo: null,
    linkedin: "https://linkedin.com/in/camila-santos",
    insights: "Designer com portfolio diversificado e experiência em design systems.",
    cv: "camila-santos-cv.pdf",
    history: [
      { date: "2024-01-21", action: "CV Processado", details: "Score inicial: 90" }
    ]
  },
  {
    id: 11,
    name: "Amanda Souza",
    position: "Gerente de Relacionamento",
    score: 93,
    status: "contacted",
    hasLinkedin: true,
    tags: ["AWS", "Azure", "Kubernetes"],
    photo: null,
    linkedin: "https://linkedin.com/in/thiago-oliveira",
    insights: "Arquiteto cloud sênior com certificações múltiplas.",
    cv: "thiago-oliveira-cv.pdf",
    history: [
      { date: "2024-01-22", action: "CV Processado", details: "Score inicial: 93" },
      { date: "2024-01-22", action: "Convite Enviado", details: "Email enviado às 16:30" }
    ]
  },
  
  // Candidatos Rejeitados (score < 85)
  {
    id: 12,
    name: "Leonardo Mazom",
    position: "Analista de Riscos",
    score: 72,
    status: "rejected",
    hasLinkedin: false,
    tags: ["JavaScript", "HTML", "CSS"],
    photo: null,
    linkedin: null,
    insights: "Desenvolvedor júnior com potencial, mas precisa de mais experiência.",
    cv: "bruno-almeida-cv.pdf",
    history: [
      { date: "2024-01-15", action: "CV Processado", details: "Score inicial: 72" },
      { date: "2024-01-16", action: "Não Qualificado", details: "Experiência insuficiente" }
    ]
  },
  {
    id: 13,
    name: "Daniel Rocha",
    position: "Gestor de Ativos",
    score: 68,
    status: "rejected",
    hasLinkedin: true,
    tags: ["Marketing", "Analytics", "SEO"],
    photo: null,
    linkedin: "https://linkedin.com/in/patricia-lima",
    insights: "Perfil de marketing, não adequado para posições técnicas.",
    cv: "patricia-lima-cv.pdf",
    history: [
      { date: "2024-01-14", action: "CV Processado", details: "Score inicial: 68" },
      { date: "2024-01-14", action: "Rejeitado", details: "Perfil inadequado" }
    ]
  },
  {
    id: 14,
    name: "Vitor Almeida",
    position: "Analista de Crédito",
    score: 65,
    status: "rejected",
    hasLinkedin: true,
    tags: ["Python", "Beginner", "University"],
    photo: null,
    linkedin: "https://linkedin.com/in/eduardo-santos",
    insights: "Estudante universitário sem experiência profissional.",
    cv: "eduardo-santos-cv.pdf",
    history: [
      { date: "2024-01-13", action: "CV Processado", details: "Score inicial: 65" },
      { date: "2024-01-13", action: "Rejeitado", details: "Falta experiência" }
    ]
  },
  {
    id: 15,
    name: "Gabriel Lima",
    position: "Analista de Dados",
    score: 58,
    status: "rejected",
    hasLinkedin: true,
    tags: ["Writing", "Content", "Communication"],
    photo: null,
    linkedin: "https://linkedin.com/in/gabriela-rocha",
    insights: "Redatora de conteúdo, perfil não técnico.",
    cv: "gabriela-rocha-cv.pdf",
    history: [
      { date: "2024-01-12", action: "CV Processado", details: "Score inicial: 58" },
      { date: "2024-01-12", action: "Rejeitado", details: "Perfil não técnico" }
    ]
  },

  // Candidatos Qualificados Adicionais (para superar os 10)
  {
    id: 16,
    name: "Juliana Souza",
    position: "Security Engineer",
    score: 88,
    status: "pending",
    hasLinkedin: true,
    tags: ["Security", "Penetration Testing", "CISSP"],
    photo: null,
    linkedin: "https://linkedin.com/in/marcos-vinicius",
    insights: "Especialista em segurança cibernética com certificações avançadas.",
    cv: "marcos-vinicius-cv.pdf",
    history: [
      { date: "2024-01-23", action: "CV Processado", details: "Score inicial: 88" }
    ]
  },
  {
    id: 17,
    name: "Bernardo Almeida",
    position: "Gestor de Portfólio",
    score: 95,
    status: "contacted",
    hasLinkedin: true,
    tags: ["Leadership", "Architecture", "Microservices"],
    photo: null,
    linkedin: "https://linkedin.com/in/beatriz-costa",
    insights: "Tech Lead experiente com histórico de liderança em projetos complexos.",
    cv: "beatriz-costa-cv.pdf",
    history: [
      { date: "2024-01-24", action: "CV Processado", details: "Score inicial: 95" },
      { date: "2024-01-24", action: "Convite Enviado", details: "Email enviado às 10:00" }
    ]
  },
  {
    id: 18,
    name: "Sophia Martins",
    position: "Site Reliability Engineer",
    score: 92,
    status: "scheduled",
    hasLinkedin: true,
    tags: ["SRE", "Monitoring", "Automation"],
    photo: null,
    linkedin: "https://linkedin.com/in/andre-luis",
    insights: "SRE sênior com experiência em sistemas de alta disponibilidade.",
    cv: "andre-luis-cv.pdf",
    history: [
      { date: "2024-01-25", action: "CV Processado", details: "Score inicial: 92" },
      { date: "2024-01-26", action: "Entrevista Agendada", details: "Para 30/01 às 14:00" }
    ]
  },
  {
    id: 19,
    name: "André Luís",
    position: "Product Designer",
    score: 87,
    status: "pending",
    hasLinkedin: true,
    tags: ["Product Design", "User Research", "Prototyping"],
    photo: null,
    linkedin: "https://linkedin.com/in/sofia-mendes",
    insights: "Product Designer com foco em pesquisa de usuários e design centrado no usuário.",
    cv: "sofia-mendes-cv.pdf",
    history: [
      { date: "2024-01-26", action: "CV Processado", details: "Score inicial: 87" }
    ]
  },
  {
    id: 20,
    name: "Felipe Augusto",
    position: "Machine Learning Engineer",
    score: 91,
    status: "contacted",
    hasLinkedin: true,
    tags: ["ML", "TensorFlow", "Deep Learning"],
    photo: null,
    linkedin: "https://linkedin.com/in/felipe-augusto",
    insights: "Engenheiro de ML com experiência em deep learning e computer vision.",
    cv: "felipe-augusto-cv.pdf",
    history: [
      { date: "2024-01-27", action: "CV Processado", details: "Score inicial: 91" },
      { date: "2024-01-27", action: "Convite Enviado", details: "Email enviado às 15:30" }
    ]
  },

  // Candidatos Em Análise (score < 85 mas status != 'rejected')
  {
    id: 21,
    name: "Ricardo Nascimento",
    position: "Mid-level Developer",
    score: 78,
    status: "pending",
    hasLinkedin: true,
    tags: ["React", "Node.js", "Mid-level"],
    photo: null,
    linkedin: "https://linkedin.com/in/ricardo-nascimento",
    insights: "Desenvolvedor em crescimento com potencial para evolução.",
    cv: "ricardo-nascimento-cv.pdf",
    history: [
      { date: "2024-01-20", action: "CV Processado", details: "Score inicial: 78" }
    ]
  },
  {
    id: 22,
    name: "Amanda Rodrigues",
    position: "Frontend Developer",
    score: 82,
    status: "contacted",
    hasLinkedin: true,
    tags: ["Vue.js", "CSS", "JavaScript"],
    photo: null,
    linkedin: "https://linkedin.com/in/amanda-rodrigues",
    insights: "Desenvolvedora frontend com conhecimentos sólidos em Vue.js.",
    cv: "amanda-rodrigues-cv.pdf",
    history: [
      { date: "2024-01-21", action: "CV Processado", details: "Score inicial: 82" },
      { date: "2024-01-22", action: "Convite Enviado", details: "Email enviado às 09:15" }
    ]
  },
  {
    id: 23,
    name: "João Pedro",
    position: "Backend Developer",
    score: 80,
    status: "scheduled",
    hasLinkedin: false,
    tags: ["Java", "Spring", "MySQL"],
    photo: null,
    linkedin: null,
    insights: "Desenvolvedor backend com experiência em Java e Spring Framework.",
    cv: "joao-pedro-cv.pdf",
    history: [
      { date: "2024-01-23", action: "CV Processado", details: "Score inicial: 80" },
      { date: "2024-01-24", action: "Entrevista Agendada", details: "Para 28/01 às 16:00" }
    ]
  },
  {
    id: 24,
    name: "Carla Fernandes",
    position: "QA Analyst",
    score: 76,
    status: "pending",
    hasLinkedin: true,
    tags: ["Manual Testing", "QA", "Agile"],
    photo: null,
    linkedin: "https://linkedin.com/in/carla-fernandes",
    insights: "Analista de QA com experiência em testes manuais e metodologias ágeis.",
    cv: "carla-fernandes-cv.pdf",
    history: [
      { date: "2024-01-24", action: "CV Processado", details: "Score inicial: 76" }
    ]
  },
  {
    id: 25,
    name: "Diego Silva",
    position: "DevOps Junior",
    score: 74,
    status: "contacted",
    hasLinkedin: true,
    tags: ["Docker", "CI/CD", "Linux"],
    photo: null,
    linkedin: "https://linkedin.com/in/diego-silva",
    insights: "DevOps júnior com conhecimentos básicos em containerização.",
    cv: "diego-silva-cv.pdf",
    history: [
      { date: "2024-01-25", action: "CV Processado", details: "Score inicial: 74" },
      { date: "2024-01-25", action: "Convite Enviado", details: "Email enviado às 13:45" }
    ]
  },
  {
    id: 26,
    name: "Larissa Santos",
    position: "UX Researcher",
    score: 81,
    status: "pending",
    hasLinkedin: true,
    tags: ["User Research", "Analytics", "Surveys"],
    photo: null,
    linkedin: "https://linkedin.com/in/larissa-santos",
    insights: "Pesquisadora UX com foco em análise de comportamento do usuário.",
    cv: "larissa-santos-cv.pdf",
    history: [
      { date: "2024-01-26", action: "CV Processado", details: "Score inicial: 81" }
    ]
  },
  {
    id: 27,
    name: "Victor Hugo",
    position: "Mobile Developer",
    score: 83,
    status: "contacted",
    hasLinkedin: true,
    tags: ["Flutter", "Android", "iOS"],
    photo: null,
    linkedin: "https://linkedin.com/in/victor-hugo",
    insights: "Desenvolvedor mobile com experiência em Flutter e desenvolvimento nativo.",
    cv: "victor-hugo-cv.pdf",
    history: [
      { date: "2024-01-27", action: "CV Processado", details: "Score inicial: 83" },
      { date: "2024-01-27", action: "Convite Enviado", details: "Email enviado às 11:20" }
    ]
  },
  {
    id: 28,
    name: "Isabela Almeida",
    position: "Data Analyst",
    score: 79,
    status: "scheduled",
    hasLinkedin: true,
    tags: ["Python", "SQL", "Power BI"],
    photo: null,
    linkedin: "https://linkedin.com/in/isabela-almeida",
    insights: "Analista de dados com conhecimentos em Python e ferramentas de BI.",
    cv: "isabela-almeida-cv.pdf",
    history: [
      { date: "2024-01-28", action: "CV Processado", details: "Score inicial: 79" },
      { date: "2024-01-28", action: "Entrevista Agendada", details: "Para 01/02 às 10:30" }
    ]
  },
  {
    id: 29,
    name: "Gustavo Lima",
    position: "Frontend Developer",
    score: 77,
    status: "pending",
    hasLinkedin: false,
    tags: ["Angular", "TypeScript", "RxJS"],
    photo: null,
    linkedin: null,
    insights: "Desenvolvedor frontend com experiência em Angular e TypeScript.",
    cv: "gustavo-lima-cv.pdf",
    history: [
      { date: "2024-01-29", action: "CV Processado", details: "Score inicial: 77" }
    ]
  },
  {
    id: 30,
    name: "Natália Pereira",
    position: "Product Manager",
    score: 84,
    status: "contacted",
    hasLinkedin: true,
    tags: ["Product Management", "Roadmap", "Stakeholders"],
    photo: null,
    linkedin: "https://linkedin.com/in/natalia-pereira",
    insights: "Product Manager com experiência em gestão de roadmaps e stakeholders.",
    cv: "natalia-pereira-cv.pdf",
    history: [
      { date: "2024-01-30", action: "CV Processado", details: "Score inicial: 84" },
      { date: "2024-01-30", action: "Convite Enviado", details: "Email enviado às 14:15" }
    ]
  },
  {
    id: 31,
    name: "Henrique Costa",
    position: "Systems Analyst",
    score: 75,
    status: "pending",
    hasLinkedin: true,
    tags: ["Systems Analysis", "Documentation", "Requirements"],
    photo: null,
    linkedin: "https://linkedin.com/in/henrique-costa",
    insights: "Analista de sistemas com experiência em levantamento de requisitos.",
    cv: "henrique-costa-cv.pdf",
    history: [
      { date: "2024-01-31", action: "CV Processado", details: "Score inicial: 75" }
    ]
  },
  {
    id: 32,
    name: "Renata Oliveira",
    position: "Tech Writer",
    score: 73,
    status: "contacted",
    hasLinkedin: true,
    tags: ["Technical Writing", "Documentation", "API Docs"],
    photo: null,
    linkedin: "https://linkedin.com/in/renata-oliveira",
    insights: "Technical Writer especializada em documentação de APIs e produtos técnicos.",
    cv: "renata-oliveira-cv.pdf",
    history: [
      { date: "2024-02-01", action: "CV Processado", details: "Score inicial: 73" },
      { date: "2024-02-01", action: "Convite Enviado", details: "Email enviado às 16:00" }
    ]
  },

  // Candidatos Rejeitados Adicionais
  {
    id: 33,
    name: "Lucas Souza",
    position: "Analista de Compliance",
    score: 45,
    status: "rejected",
    hasLinkedin: true,
    tags: ["Sales", "CRM", "B2B"],
    photo: null,
    linkedin: "https://linkedin.com/in/alexandre-santos",
    insights: "Perfil comercial, não adequado para posições técnicas.",
    cv: "alexandre-santos-cv.pdf",
    history: [
      { date: "2024-01-28", action: "CV Processado", details: "Score inicial: 45" },
      { date: "2024-01-28", action: "Rejeitado", details: "Perfil não técnico" }
    ]
  },
  {
    id: 34,
    name: "Renan Machado",
    position: "Especialista em Operações",
    score: 52,
    status: "rejected",
    hasLinkedin: true,
    tags: ["HR", "Recruitment", "People Management"],
    photo: null,
    linkedin: "https://linkedin.com/in/priscila-souza",
    insights: "Coordenadora de RH sem experiência técnica.",
    cv: "priscila-souza-cv.pdf",
    history: [
      { date: "2024-01-29", action: "CV Processado", details: "Score inicial: 52" },
      { date: "2024-01-29", action: "Rejeitado", details: "Área não técnica" }
    ]
  },
  {
    id: 35,
    name: "Beatriz Nunes",
    position: "Gestor de Ativos",
    score: 61,
    status: "rejected",
    hasLinkedin: false,
    tags: ["Student", "Intern", "Basic Programming"],
    photo: null,
    linkedin: null,
    insights: "Estagiário sem experiência profissional suficiente.",
    cv: "roberto-silva-cv.pdf",
    history: [
      { date: "2024-01-30", action: "CV Processado", details: "Score inicial: 61" },
      { date: "2024-01-30", action: "Rejeitado", details: "Experiência insuficiente" }
    ]
  },
  {
    id: 36,
    name: "Beatriz Armani",
    position: "Consultor Financeiro",
    score: 38,
    status: "rejected",
    hasLinkedin: true,
    tags: ["Administrative", "Office", "Support"],
    photo: null,
    linkedin: "https://linkedin.com/in/tania-ferreira",
    insights: "Assistente administrativa sem background técnico.",
    cv: "tania-ferreira-cv.pdf",
    history: [
      { date: "2024-01-31", action: "CV Processado", details: "Score inicial: 38" },
      { date: "2024-01-31", action: "Rejeitado", details: "Perfil não técnico" }
    ]
  },
  {
    id: 37,
    name: "Paula Miranda",
    position: "Gestor de Ativos",
    score: 69,
    status: "rejected",
    hasLinkedin: true,
    tags: ["JavaScript", "HTML", "Beginner"],
    photo: null,
    linkedin: "https://linkedin.com/in/marcio-rocha",
    insights: "Desenvolvedor júnior com conhecimentos muito básicos.",
    cv: "marcio-rocha-cv.pdf",
    history: [
      { date: "2024-02-01", action: "CV Processado", details: "Score inicial: 69" },
      { date: "2024-02-01", action: "Rejeitado", details: "Conhecimentos técnicos insuficientes" }
    ]
  },
  {
    id: 38,
    name: "Henrique Bartello",
    position: "Gerente de Portfólio",
    score: 55,
    status: "rejected",
    hasLinkedin: true,
    tags: ["Graphic Design", "Photoshop", "Print Design"],
    photo: null,
    linkedin: "https://linkedin.com/in/luana-costa",
    insights: "Designer gráfico sem experiência em UX/UI digital.",
    cv: "luana-costa-cv.pdf",
    history: [
      { date: "2024-02-02", action: "CV Processado", details: "Score inicial: 55" },
      { date: "2024-02-02", action: "Rejeitado", details: "Foco em design impresso" }
    ]
  },
  {
    id: 39,
    name: "Daniel Oliveira",
    position: "Support Technician",
    score: 64,
    status: "rejected",
    hasLinkedin: false,
    tags: ["Technical Support", "Hardware", "Help Desk"],
    photo: null,
    linkedin: null,
    insights: "Técnico de suporte sem experiência em desenvolvimento.",
    cv: "daniel-oliveira-cv.pdf",
    history: [
      { date: "2024-02-03", action: "CV Processado", details: "Score inicial: 64" },
      { date: "2024-02-03", action: "Rejeitado", details: "Perfil de suporte técnico" }
    ]
  },
  {
    id: 40,
    name: "Pedro Martins",
    position: "Marketing Specialist",
    score: 42,
    status: "rejected",
    hasLinkedin: true,
    tags: ["Marketing", "Social Media", "Content"],
    photo: null,
    linkedin: "https://linkedin.com/in/camila-lima",
    insights: "Especialista em marketing digital sem conhecimentos técnicos.",
    cv: "camila-lima-cv.pdf",
    history: [
      { date: "2024-02-04", action: "CV Processado", details: "Score inicial: 42" },
      { date: "2024-02-04", action: "Rejeitado", details: "Área não técnica" }
    ]
  }
];

const Candidates = () => {
  const { isCollapsed: sidebarCollapsed, toggleSidebar } = useSidebarState();
  const [searchTerm, setSearchTerm] = useState("");
  const [scoreRange, setScoreRange] = useState([0, 100]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showAllQualified, setShowAllQualified] = useState(false);
  const [showAllRejected, setShowAllRejected] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("score-desc");
  const { toast } = useToast();

  // Function to sort candidates
  const sortCandidates = (candidates: Candidate[]) => {
    const sorted = [...candidates];
    
    switch (sortBy) {
      case "score-desc":
        return sorted.sort((a, b) => b.score - a.score);
      case "score-asc":
        return sorted.sort((a, b) => a.score - b.score);
      case "recent-approved":
        return sorted.sort((a, b) => {
          // Sort by qualified candidates first (score >= 85), then by date
          const aQualified = a.score >= 85;
          const bQualified = b.score >= 85;
          
          if (aQualified && !bQualified) return -1;
          if (!aQualified && bQualified) return 1;
          
          // If both or neither are qualified, sort by most recent history entry
          const aDate = a.history?.length ? new Date(a.history[a.history.length - 1].date) : new Date(0);
          const bDate = b.history?.length ? new Date(b.history[b.history.length - 1].date) : new Date(0);
          return bDate.getTime() - aDate.getTime();
        });
      default:
        return sorted;
    }
  };

  // Filter and sort candidates
  const filteredCandidates = sortCandidates(mockCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesScore = candidate.score >= scoreRange[0] && candidate.score <= scoreRange[1];
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(candidate.status);

    return matchesSearch && matchesScore && matchesStatus;
  }));

  // Estatísticas dinâmicas
  const stats = {
    total: filteredCandidates.length,
    avgScore: filteredCandidates.length > 0 
      ? Math.round(filteredCandidates.reduce((sum, c) => sum + c.score, 0) / filteredCandidates.length)
      : 0,
    qualified: filteredCandidates.filter(c => c.score >= 85).length,
    rejected: filteredCandidates.filter(c => c.status === 'rejected').length
  };

  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: `Exportando ${filteredCandidates.length} candidatos em formato CSV...`,
      variant: "glass",
      duration: 3000,
    });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar} 
      />
      
      <div 
        className={`flex-1 min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-28' : 'ml-72'
        }`}
      >
        <div className="pt-8 p-6 max-w-screen-2xl mx-auto space-y-6">
          {/* Header Premium */}
          <div className="mb-6 animate-fade-in-up">
            <div className="flex items-end justify-between mb-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  Gestão de Candidatos
                </h1>
                <p className="text-sm text-white/70 font-medium">
                  Pipeline de talentos • Análise avançada de perfis
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pesquisar candidato"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 h-9 px-3 pr-10 text-sm bg-transparent border border-white/20 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                </div>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32 bg-transparent border border-white/20 text-white text-sm h-9 hover:bg-white/5 transition-colors">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <span>Ordenar</span>
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 backdrop-blur-md border border-white/10 z-50">
                    <SelectItem value="score-desc" className="text-white hover:bg-white/10 focus:bg-white/10">Score: Maior → Menor</SelectItem>
                    <SelectItem value="score-asc" className="text-white hover:bg-white/10 focus:bg-white/10">Score: Menor → Maior</SelectItem>
                    <SelectItem value="recent-approved" className="text-white hover:bg-white/10 focus:bg-white/10">Mais Recentes</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  onClick={() => setShowFilters(true)}
                  variant="outline-glow"
                  className="text-sm h-9 px-4"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                
                <Button 
                  onClick={handleExport} 
                  variant="outline-glow"
                  className="text-sm h-9 px-4"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Dados
                </Button>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="glass-card p-4 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-4 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <Target className="h-4 w-4 text-warning" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{stats.avgScore}</p>
                    <p className="text-xs text-muted-foreground">Score Médio</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-4 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <TrendingUp className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{stats.qualified}</p>
                    <p className="text-xs text-muted-foreground">Qualificados</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-4 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-destructive/10">
                    <Users className="h-4 w-4 text-destructive" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{stats.rejected}</p>
                    <p className="text-xs text-muted-foreground">Rejeitados</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Candidates Sections */}
          <div className="space-y-12">
            {/* Qualified Candidates Section */}
          {(() => {
            const qualifiedCandidates = filteredCandidates.filter(c => c.score >= 85);
            const displayedCandidates = showAllQualified ? qualifiedCandidates : qualifiedCandidates.slice(0, 10);
            
            return qualifiedCandidates.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                    <Users className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Candidatos Qualificados</h2>
                    <p className="text-sm text-muted-foreground">Score &gt;= 85 • Contato automático ativado</p>
                  </div>
                </div>
                
                <div className="grid gap-4 grid-cols-5">
                  {displayedCandidates.map((candidate, index) => (
                    <div 
                      key={candidate.id} 
                      style={{ animationDelay: `${index * 0.05}s` }}
                      className="animate-fade-in"
                    >
                      <CandidateCard 
                        candidate={candidate} 
                        onClick={() => setSelectedCandidate(candidate)}
                        isQualified={true}
                      />
                    </div>
                  ))}
                </div>
                
                {qualifiedCandidates.length > 10 && (
                  <div className="flex justify-start">
                    {!showAllQualified ? (
                      <Button 
                        onClick={() => setShowAllQualified(true)}
                        variant="outline"
                        className="glass-card border-white/20 hover:bg-white/10 text-white max-w-xs font-medium transition-all duration-300"
                      >
                        Carregar Mais
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => setShowAllQualified(false)}
                        variant="outline"
                        className="glass-card border-white/20 hover:bg-white/10 text-white max-w-xs font-medium transition-all duration-300"
                      >
                        Mostrar Menos
                      </Button>
                    )}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Rejected Candidates Section */}
          {(() => {
            const rejectedCandidates = filteredCandidates.filter(c => c.status === 'rejected');
            const displayedCandidates = showAllRejected ? rejectedCandidates : rejectedCandidates.slice(0, 10);
            
            return rejectedCandidates.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center">
                    <Users className="h-4 w-4 text-destructive" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Recusados</h2>
                    <p className="text-sm text-muted-foreground">Não atendem aos critérios mínimos</p>
                  </div>
                </div>
                
                <div className="grid gap-4 grid-cols-5">
                  {displayedCandidates.map((candidate, index) => (
                    <div 
                      key={candidate.id} 
                      style={{ animationDelay: `${index * 0.05}s` }}
                      className="animate-fade-in"
                    >
                      <CandidateCard 
                        candidate={candidate} 
                        onClick={() => setSelectedCandidate(candidate)}
                        isQualified={false}
                      />
                    </div>
                  ))}
                </div>
                
                {rejectedCandidates.length > 10 && (
                  <div className="flex justify-start">
                    {!showAllRejected ? (
                      <Button 
                        onClick={() => setShowAllRejected(true)}
                        variant="outline"
                        className="glass-card border-white/20 hover:bg-white/10 text-white max-w-xs font-medium transition-all duration-300"
                      >
                        Carregar Mais
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => setShowAllRejected(false)}
                        variant="outline"
                        className="glass-card border-white/20 hover:bg-white/10 text-white max-w-xs font-medium transition-all duration-300"
                      >
                        Mostrar Menos
                      </Button>
                    )}
                  </div>
                )}
              </div>
            );
          })()}
          </div>

          {/* Empty State */}
          {filteredCandidates.length === 0 && (
            <div className="text-center py-20 animate-fade-in">
              <div className="glass-card p-12 max-w-lg mx-auto">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-muted/20 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Nenhum candidato encontrado
                  </h3>
                  <p className="text-muted-foreground">
                    Ajuste os filtros para encontrar candidatos que atendam aos critérios desejados
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setScoreRange([0, 100]);
                    setSelectedStatuses([]);
                  }}
                  className="glass-card border-white/20 hover:bg-white/10"
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Candidate Modal */}
      <CandidateModal 
        candidate={selectedCandidate}
        isOpen={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />

      {/* Filters Sidebar */}
      <CandidateFilters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        scoreRange={scoreRange}
        setScoreRange={setScoreRange}
        selectedStatuses={selectedStatuses}
        setSelectedStatuses={setSelectedStatuses}
        onApplyFilters={() => {
          toast({
            title: "Filtros aplicados",
            description: `Filtros atualizados com sucesso!`,
            variant: "glass",
            duration: 2000,
          });
        }}
      />
    </div>
  );
};

export default Candidates;