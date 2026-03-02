import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { motion } from "motion/react";
import logo from "figma:asset/37aed1173d45ba7ea7027bec25fcd07064b45393.png";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div>
            <img
              src={logo}
              alt="NYBC Aviamentos"
              className="h-10 w-auto mb-4"
            />
            <p className="text-sm text-gray-600 leading-relaxed">
              Seu destino para produtos premium e experiências de compra excepcionais. Qualidade em que você pode confiar, entregue com cuidado.
            </p>
          </div>

          {/* Shop Section */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-900">
              Loja
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Novidades
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Mais Vendidos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Promoções
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Cartões Presente
                </a>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-900">
              Ajuda
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Atendimento ao Cliente
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Rastrear Pedido
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Devoluções e Trocas
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Informações de Envio
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-900">
              Fique Conectado
            </h4>
            <p className="mb-4 text-sm text-gray-600">
              Inscreva-se para receber ofertas especiais e atualizações.
            </p>
            <form className="mb-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  <Mail className="h-4 w-4" />
                </motion.button>
              </div>
            </form>
            {/* Social Icons */}
            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-900 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-900 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-900 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-900 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-600">
              © 2026 NYBC Aviamentos. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Termos de Serviço
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Política de Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}