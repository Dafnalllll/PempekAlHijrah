<template>
  <main class="flex min-h-screen items-center justify-center bg-[#FAF8F2] p-6">
    <section class="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
      <div class="mb-6 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
        Tailwind CSS Aktif
      </div>

      <h1 class="text-3xl font-bold tracking-tight text-[#15353B]">
        Pempek Al Hijrah
      </h1>

      <p class="mt-3 leading-7 text-gray-600">
        Fondasi frontend berhasil disiapkan. Sekarang kita memverifikasi
        styling, warna, spacing, dan komponen responsif.
      </p>

      <div class="mt-6 grid grid-cols-2 gap-4">
        <div class="rounded-xl bg-[#15353B] p-4 text-white">
          <p class="text-sm text-gray-200">Warna utama</p>
          <p class="mt-1 font-semibold">Deep Teal</p>
        </div>

        <div class="rounded-xl bg-[#D9A34A] p-4 text-[#15353B]">
          <p class="text-sm">Warna aksen</p>
          <p class="mt-1 font-semibold">Warm Gold</p>
        </div>
      </div>

      <button
        class="mt-6 w-full rounded-xl bg-[#15353B] px-5 py-3 font-semibold text-white transition hover:bg-[#24545B] focus:outline-none focus:ring-4 focus:ring-emerald-200"
      >
        Uji Tombol Tailwind
      </button>
    </section>
  </main>
</template>
