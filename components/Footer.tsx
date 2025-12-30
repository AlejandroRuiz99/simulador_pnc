import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gold/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Logo y descripción */}
          <div>
            <Link href="https://compromisolegal.es" target="_blank" rel="noopener noreferrer">
              <Image
                src="/complete_logo.png"
                alt="Compromiso Legal"
                width={150}
                height={60}
                className="mb-4 hover:scale-105 transition-transform"
              />
            </Link>
          </div>

          {/* Enlaces útiles */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold">Enlaces Útiles</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://compromisolegal.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold transition-colors text-sm"
                >
                  Compromiso Legal
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@compromisolegal.es" className="hover:text-gold transition-colors">
                  info@compromisolegal.es
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+34640664875" className="hover:text-gold transition-colors">
                  +34 640 664 875
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <a href="https://compromisolegal.es" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  compromisolegal.es
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <svg className="w-5 h-5 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>WhatsApp disponible</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gold/10 pt-8 mb-8">
          <div className="bg-gray-900/50 border border-gold/20 rounded-lg p-6">
            <h4 className="font-bold text-gold mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Aviso Legal
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Este simulador tiene carácter meramente <strong className="text-white">orientativo e informativo</strong>. 
              Los resultados obtenidos no constituyen un documento oficial ni garantizan el reconocimiento del derecho a la prestación. 
              Los datos introducidos no se almacenan, no se transmiten a ningún servidor y no se utilizan para ningún fin más allá del cálculo 
              orientativo en su navegador. Para una evaluación definitiva de su situación particular y una gestión completa de su solicitud, 
              <a href="https://compromisolegal.es" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline mx-1">
                nuestro equipo de Compromiso Legal puede encargarse de todo el proceso por usted
              </a>.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500">
          <p className="mb-2">
            © {new Date().getFullYear()} <a href="https://compromisolegal.es" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Compromiso Legal</a>. Todos los derechos reservados.
          </p>
          <p className="text-xs">
            Basado en la legislación española vigente en 2026 · Última actualización: Enero 2026
          </p>
        </div>
      </div>
    </footer>
  );
}

