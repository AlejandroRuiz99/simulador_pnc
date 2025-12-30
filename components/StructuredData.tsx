export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Simulador de Pensión No Contributiva',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    description: 'Simulador gratuito para calcular la elegibilidad para pensiones no contributivas en España según la legislación vigente 2026.',
    provider: {
      '@type': 'LegalService',
      name: 'Compromiso Legal',
      description: 'Despacho de abogados especializado en Seguridad Social, Derecho Laboral y Extranjería',
      url: 'https://compromisolegal.es',
      telephone: '+34640664875',
      email: 'info@compromisolegal.es',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'C/Manzanares 35, A',
        addressLocality: 'Bolaños de Calatrava',
        addressRegion: 'Ciudad Real',
        postalCode: '13260',
        addressCountry: 'ES',
      },
      areaServed: {
        '@type': 'Country',
        name: 'España',
      },
      priceRange: '$$',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '09:00',
          closes: '14:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '16:30',
          closes: '18:30',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Friday',
          opens: '09:00',
          closes: '14:00',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios Legales',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Asesoría Pensiones No Contributivas',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Derecho de Extranjería y Nacionalidad',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Derecho Laboral y Seguridad Social',
            },
          },
        ],
      },
    },
    author: [
      {
        '@type': 'Person',
        name: 'Miriam Ruiz Acosta',
        jobTitle: 'Abogada',
        description: 'Especializada en Seguridad Social y Extranjería',
      },
      {
        '@type': 'Person',
        name: 'Aristea Olmedo',
        jobTitle: 'Graduada Social',
        description: 'Especializada en Seguridad Social y Derecho Laboral',
      },
    ],
    about: {
      '@type': 'Thing',
      name: 'Pensión No Contributiva',
      description: 'Prestación económica de la Seguridad Social española para personas sin recursos que no han cotizado lo suficiente',
    },
    inLanguage: 'es-ES',
    isAccessibleForFree: true,
    license: 'https://compromisolegal.es',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://simuladorpensionnocontributiva.com',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Qué es una pensión no contributiva?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Es una prestación económica que otorga la Seguridad Social a personas en situación de necesidad que no han cotizado lo suficiente para acceder a una pensión contributiva. Su objetivo es garantizar un ingreso mínimo.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto se cobra en 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La cuantía máxima para 2026 es de 628,80€ mensuales (8.803,2€ anuales en 14 pagas). La cantidad puede variar según tus ingresos personales y familiares.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Es compatible con trabajar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Solo la pensión de invalidez no contributiva es compatible con trabajar. Durante los primeros 4 años trabajando, se aplica un límite de ingresos especial de 16.003,2€ anuales. La pensión de jubilación no contributiva no es compatible con trabajo.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto tarda la resolución?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El plazo máximo legal es de 90 días desde la presentación de la solicitud completa con toda la documentación.',
        },
      },
      {
        '@type': 'Question',
        name: '¿La pensión incluye asistencia sanitaria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, al reconocerse la pensión no contributiva, automáticamente tienes derecho a la tarjeta sanitaria y a la asistencia médica y farmacéutica gratuita de la Seguridad Social.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}

