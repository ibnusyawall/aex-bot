const Quotes = () => new Promise((resolve, reject) => {
  let arr = [
    'Bagi dunia, kamu mungkin satu orang, tetapi bagi satu orang kamu adalah dunia.',
    'Cinta mungkin hadir karena takdir tapi tak ada salahnya kita saling memperjuangkan.',
    'Cinta adalah d imana kamu selalu punya alasan untuk kembali meski kamu sudah berjalan begitu jauh.',
    'Dalam cinta, menyerah tak selalu berarti kamu lemah. Kadang itu hanya berarti kamu cukup kuat tuk melepaskannya.',
    'Kamu mungkin memegang tanganku untuk sementara waktu, tetapi kamu memegang hatiku selamanya.',
    'Saat aku bersamamu, aku akan melepaskan segala ketakutan dan kecemasan.',
    'Kamu nyaman? Kamu sayang? Tapi cuma dianggap temen? Kadang gitu. Nyamanmu belum tentu nyamannya. Cukup dipahami aja.',
    'Dibilang sayang? Iya. Dibilang cinta? Iya. Dibilang pacar? Bukan.',
    'Apakah namamu WiFi? Soalnya aku bisa merasakan konektivitas.',
    'Bersamamu aku tidak pernah takut lagi menjadi pemimpi.',
    'Move on itu pilihan. Gagal move on itu cobaan. Pura-pura move on itu pencitraan.',
    'Sepurane aku nggak nguber awakmu maneh. Kepastianmu abstrak, podo karo raimu.',
    'You`re just my cup of tea.',
    'My love belongs to you.',
    'I love you - those three words have my life in them.',
    'You are my strength but loving you is my biggest weakness.',
    'I promise that i`ll love you in every step of mine',
    'Aku tidak pernah keberatan menunggu siapa pun berapa lama pun selama aku mencintainya.',
    'Aku tak ingin berakhir seperti mereka, saling mencintai. Lantas kehilangan dan kini mereka hanya mengenang dan merenung dari jauh.',
    'Kau mencintaiku tanpa sepatah kata, aku mencintaimu, dengan satu kata yang tak pernah patah.',
    'Allah menciptakan senja untuk mengingatkanku untuk pulang pada cinta yang kukenang.',
    'Cinta tak berupa tatapan satu sama lain, tetapi memandang keluar bersama ke arah yang sama.',
    'Cinta tidak terlihat dengan mata, tetapi dengan hati.',
    'Cinta itu layaknya angin, aku tidak bisa melihatnya tetapi aku bisa merasakannya.',
    'Cinta tidak pernah menuntut, cinta selalu memberi. Cinta selalu menderita, tanpa pernah meratap, tanpa pernah mendendam.',
    'Masa lalu saya adalah milik saya, masa lalu kamu adalah milik kamu, tapi masa depan adalah milik kita.',
    'Bahagia itu kita yang ciptain, bukan mereka.',
    'Cinta itu, rela melihat orang yang kita cintai bahagia bareng orang lain.',
    'Aku hanyalah kunang-kunang, dan kau hanyalah senja, dalam gelap kita berbagi, dalam gelap kita abadi.',
    'Dalam diam, aku memperjuangkan cintamu dalam doaku.',
  ]
  let acak = arr[Math.floor(Math.random() * arr.length)]
  resolve(acak)
})

module.exports = Quotes
