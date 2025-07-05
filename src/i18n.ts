import i18n from 'i18next';
import { initReactI18next } from '@react-i18next/react-i18next';

const resources = {
  en: {
    translation: {
      satellite: {
        title: 'Dynamic Architect Satellite',
        description: 'Explore our AI-powered tools and agents',
      },
      submit: {
        title: 'Submit Your GPT',
        success: 'GPT submitted successfully!',
        error: 'Error submitting GPT. Please try again.',
        fields: {
          name: 'GPT Name',
          description: 'Description',
          prompt: 'Prompt Template',
          tags: 'Tags (comma separated)',
          language: 'Language',
        },
        submit: 'Submit GPT'
      },
      moderation: {
        title: 'Moderation Panel',
        search: 'Search GPTs...',
        all: 'All',
        pending: 'Pending',
        approved: 'Approved',
        rejected: 'Rejected',
        status: {
          pending: 'Pending',
          approved: 'Approved',
          rejected: 'Rejected'
        },
        approve: 'Approve',
        reject: 'Reject'
      }
    },
  },
  fr: {
    translation: {
      satellite: {
        title: 'Satellite Dynamic Architect',
        description: 'Explorez nos outils et agents IA',
      },
      submit: {
        title: 'Soumettre votre GPT',
        success: 'GPT soumis avec succès !',
        error: 'Erreur lors de la soumission du GPT. Veuillez réessayer.',
        fields: {
          name: 'Nom du GPT',
          description: 'Description',
          prompt: 'Modèle de prompt',
          tags: 'Tags (séparés par des virgules)',
          language: 'Langue',
        },
        submit: 'Soumettre le GPT'
      },
      moderation: {
        title: 'Panneau de modération',
        search: 'Rechercher des GPTs...',
        all: 'Tous',
        pending: 'En attente',
        approved: 'Approuvés',
        rejected: 'Rejetés',
        status: {
          pending: 'En attente',
          approved: 'Approuvé',
          rejected: 'Rejeté'
        },
        approve: 'Approuver',
        reject: 'Rejeter'
      }
    },
  },
  es: {
    translation: {
      satellite: {
        title: 'Satélite Dynamic Architect',
        description: 'Explora nuestras herramientas y agentes IA',
      },
      submit: {
        title: 'Enviar su GPT',
        success: '¡GPT enviado con éxito!',
        error: 'Error al enviar el GPT. Por favor, inténtelo de nuevo.',
        fields: {
          name: 'Nombre del GPT',
          description: 'Descripción',
          prompt: 'Plantilla de prompt',
          tags: 'Tags (separados por comas)',
          language: 'Idioma',
        },
        submit: 'Enviar GPT'
      },
      moderation: {
        title: 'Panel de Moderación',
        search: 'Buscar GPTs...',
        all: 'Todos',
        pending: 'Pendientes',
        approved: 'Aprobados',
        rejected: 'Rechazados',
        status: {
          pending: 'Pendiente',
          approved: 'Aprobado',
          rejected: 'Rechazado'
        },
        approve: 'Aprobar',
        reject: 'Rechazar'
      }
    },
  },
  de: {
    translation: {
      satellite: {
        title: 'Dynamic Architect Satellit',
        description: 'Entdecken Sie unsere KI-gesteuerten Tools und Agenten',
      },
      submit: {
        title: 'Ihr GPT einreichen',
        success: 'GPT erfolgreich eingereicht!',
        error: 'Fehler beim Einreichen des GPT. Bitte versuchen Sie es erneut.',
        fields: {
          name: 'GPT-Name',
          description: 'Beschreibung',
          prompt: 'Prompt-Vorlage',
          tags: 'Tags (durch Kommas getrennt)',
          language: 'Sprache',
        },
        submit: 'GPT einreichen'
      },
      moderation: {
        title: 'Moderationsbereich',
        search: 'GPTs durchsuchen...',
        all: 'Alle',
        pending: 'Ausstehend',
        approved: 'Genehmigt',
        rejected: 'Abgelehnt',
        status: {
          pending: 'Ausstehend',
          approved: 'Genehmigt',
          rejected: 'Abgelehnt'
        },
        approve: 'Genehmigen',
        reject: 'Ablehnen'
      }
    },
  },
  ar: {
    translation: {
      satellite: {
        title: 'قمر دايناميكي',
        description: 'استكشف أدواتنا ووكلاء الذكاء الاصطناعي',
      },
      submit: {
        title: 'إرسال GPT الخاص بك',
        success: 'تم إرسال GPT بنجاح!',
        error: 'حدث خطأ أثناء إرسال GPT. يرجى المحاولة مرة أخرى.',
        fields: {
          name: 'اسم GPT',
          description: 'الوصف',
          prompt: 'قالب الدفع',
          tags: 'العلامات (مفصولة بفواصل)',
          language: 'اللغة',
        },
        submit: 'إرسال GPT'
      },
      moderation: {
        title: 'لوحة المoderation',
        search: 'البحث عن GPTs...',
        all: 'الكل',
        pending: 'قيد الانتظار',
        approved: 'تمت الموافقة',
        rejected: 'مرفوض',
        status: {
          pending: 'قيد الانتظار',
          approved: 'تمت الموافقة',
          rejected: 'مرفوض'
        },
        approve: 'موافق',
        reject: 'رفض'
      }
    },
  },
  zh: {
    translation: {
      satellite: {
        title: '动态架构卫星',
        description: '探索我们的人工智能工具和代理',
      },
      submit: {
        title: '提交您的GPT',
        success: 'GPT提交成功！',
        error: '提交GPT时出错。请重试。',
        fields: {
          name: 'GPT名称',
          description: '描述',
          prompt: '提示模板',
          tags: '标签（逗号分隔）',
          language: '语言',
        },
        submit: '提交GPT'
      },
      moderation: {
        title: '审核面板',
        search: '搜索GPT...',
        all: '全部',
        pending: '待审核',
        approved: '已批准',
        rejected: '已拒绝',
        status: {
          pending: '待审核',
          approved: '已批准',
          rejected: '已拒绝'
        },
        approve: '批准',
        reject: '拒绝'
      }
    },
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
