import { React } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const navigation = [
    { name: "Color Picker", href: "/", active: location.pathname === "/" },
    {
      name: "Color Trends",
      href: "/report",
      active: location.pathname === "/report",
    },
  ];
  return (
    <Disclosure as="nav" className="bg-white">
      <div className="mx-auto max-w-7xl px-2 mt-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Victory Farms"
                src={require("./logo.png")}
                className="h-10 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`group text-black transition-all duration-300 ease-in-out block rounded-md px-2 py-2 text-base font-medium relative overflow-hidden ${
                      item.active
                        ? "text-green-600 hover:text-black"
                        : "text-black"
                    }`}
                  >
                    <span
                      className={`absolute inset-x-0 bottom-1 h-[3px] bg-green-500 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100`}
                    ></span>
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              href={item.href}
              className={`group text-black transition-all duration-300 ease-in-out block rounded-md px-2 py-2 text-base font-medium relative overflow-hidden ${
                item.active ? "text-green-600 hover:text-black" : "text-black"
              }`}
            >
              <span
                className={`absolute inset-x-0 bottom-1 h-[3px] bg-green-500 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100`}
              ></span>
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export default Header;
