"use client";

import React from 'react'
import { useTranslations } from "next-intl";

const ContentSection = () => {
      const t = useTranslations("Visa");

  return (
     <section
        style={{ padding: "20px" }}
        className="container mx-autopx-6 py-16 space-y-12 flex  flex-col gap-8 mb-3 animate-slideUp delay-200"
      >
        {/* Who Can Apply */}
        <div className="container animate-slideUp delay-400">
          <h2 className="text-3xl font-bold mb-4">{t("title1")}</h2>
          <p className="text-lg leading-relaxed">
           {t("p2")}
          </p>
        </div>

        {/* Types of Visas */}
        <div>
          <h2 className="text-3xl font-bold mb-4 animate-slideUp delay-600">{t("title2")}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-[#d4a85f] text-left">
              <thead className="bg-[#ff9800] text-white">
                <tr>
                  <th className="px-4 py-2">{t("th")}</th>
                  <th className="px-4 py-2">{t("th2")}</th>
                  <th className="px-4 py-2">{t("th3")}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">{t("th4")}</td>
                  <td className="px-4 py-2">{t("th5")}</td>
                  <td className="px-4 py-2">{t("th6")}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">{t("th7")}</td>
                  <td className="px-4 py-2">{t("th8")}</td>
                  <td className="px-4 py-2">{t("th9")}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">{t("th10")}</td>
                  <td className="px-4 py-2">
                    {t("th11")}
                  </td>
                  <td className="px-4 py-2">{t("th12")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Basic Requirements */}
        <div className='animate-slideUp delay-800'>
          <h2 className="text-3xl font-bold mb-4">{t("title3")}</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>{t("li")}</li>
            <li>{t("li2")}</li>
            <li>{t("li3")}</li>
            <li>{t("li4")}</li>
            <li>{t("li5")}</li>
          </ul>
        </div>

        {/* Fees */}
        <div className='animate-slideUp delay-1000'>
          <h2 className="text-3xl font-bold mb-4">{t("title4")}</h2>
          <table className="w-full border border-[#ff9800] text-left">
            <thead className="bg-[#d4a85f] text-white">
              <tr>
                <th className="px-4 py-2">{t("th13")}</th>
                <th className="px-4 py-2">{t("th14")}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">{t("th15")}</td>
                <td className="px-4 py-2">{t("th16")}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">{t("th17")}</td>
                <td className="px-4 py-2">{t("th18")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Application Steps */}
        <div className='animate-slideUp delay-1200'>
          <h2 className="text-3xl font-bold mb-4">
            {t("title5")}
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-lg">
            <li>{t("li6")}</li>
            <li>{t("li7")}</li>
            <li>{t("li8")}</li>
            <li>{t("li9")}</li>
            <li>{t("li10")}</li>
          </ol>
          <div className="mt-4 space-x-4">
            <a
              href="https://www.visa2egypt.gov.eg/eVisa/en/"
              target="_blank"
              className="text-[#ff9800] font-semibold underline"
            >
              {t("link1")}
            </a>
            <a
              href="https://www.presidency.eg/en/projects/evisa/"
              target="_blank"
              className="text-[#d4a85f] font-semibold underline"
              style={{ marginLeft: "20px" }}
            >
              {t("link2")}
            </a>
          </div>
        </div>

        {/* Important Notes */}
        <div className='animate-slideUp delay-1400'>
          <h2 className="text-3xl font-bold mb-4">{t("title6")}</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>{t("li11")}</li>
            <li>{t("li12")}</li>
            <li>{t("li13")}</li>
            <li>{t("li14")}</li>
          </ul>
        </div>

        {/* Contact */}
        <div className='animate-slideUp delay-1600'>
          <h2 className="text-3xl font-bold mb-4">{t("title7")}</h2>
          <p className="text-lg">
            {t("p3")}
            <br />
            📧 Email:{" "}
            <a
              href="mailto:visa@egypt.gov.eg"
              className="text-[#ff9800] underline"
            >
              visa@egypt.gov.eg
            </a>
            <br />
            📞 Hotline: <span className="font-semibold">19654</span>
          </p>
        </div>
      </section>
  )
}

export default ContentSection
