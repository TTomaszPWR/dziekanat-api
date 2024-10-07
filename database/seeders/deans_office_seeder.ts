import DeansOffice from '#models/deans_office'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await DeansOffice.createMany([
      {
        id:1,
        name: 'Dziekanat Wydziału Architektury',
        location: 'ul. Piotrowo 3, 60-965 Poznań',
        link: 'https://wa.pwr.edu.pl/studenci/studia-i-stopnia-2/dziekanat'
      },
      {
        id:2,
        name: 'Dziekanat Wydziału Budownictwa Lądowego i Wodnego',
        location: 'ul. Na Grobli 15, 50-421 Wrocław, bud. L-1, pok. 127/ 348',
        link: 'https://wbliw.pwr.edu.pl/studenci/dziekanat'
      },
      {
        id:3,
        name: 'Dziekanat Wydziału Chemicznego',
        location: 'ul. C.K. Norwida 4/6, 50-373 Wrocław, bud. C-6, pok. 056',
        link: 'https://wch.pwr.edu.pl/studenci/dziekanat'
      },
      {
        id:4,
        name: 'Dziekanat Wydziału Informatyki i Telekomunikacji',
        location: 'ul. Janiszewskiego 11/17, 50-372 Wrocław, bud. C-1, pok. 102a',
        link: 'https://wit.pwr.edu.pl/studenci/dziekanat/kontakt'
      },
      {
        id:5,
        name: 'Dziekanat Wydziału Elektrycznego',
        location: 'ul. Janiszewskiego 8, 50-372 Wrocław, bud. D-20, pok. 213',
        link: 'https://weny.pwr.edu.pl/studenci/dziekanat'
      },
      {
        id:6,
        name: 'Dziekanat Wydziału Geoinżynierii, Górnictwa i Geologii',
        location: 'ul. Na Grobli 15, 50-421 Wrocław, bud. L-1, pok. 258',
        link: 'https://wggg.pwr.edu.pl/studenci/dziekanat'
      },
      {
        id:7,
        name: 'Dziekanat Wydziału Inżynierii Środowiska',
        location: 'pl. Grunwaldzki 13, 50-377 Wrocław, bud. D-1, pok. 11.3',
        link: 'https://wis.pwr.edu.pl/o-wydziale/struktura-organizacyjna/dziekanat-wydzialu'
      },
      {
        id:8,
        name: 'Dziekanat Wydziału Zarządzania',
        location: 'ul. Łukasiewicza 5, 50-371 Wrocław, bud. B-4, pok. 1a8-1a11',
        link: 'https://wz.pwr.edu.pl/studenci/1dziekanat'
      },
      {
        id:9,
        name: 'Dziekanat Wydziału Mechaniczno-Energetycznego',
        location: 'ul. wybrzeże Stanisława Wyspiańskiego 27, 50-370 Wrocław, bud. A-1, pok. 245',
        link: 'https://wme.pwr.edu.pl/o-wydziale/struktura-organizacyjna/administracja-dziekanatu'
      },
      {
        id:10,
        name: 'Dziekanat Wydziału Mechanicznego',
        location: 'ul. Łukasiewicza 5, 50-371 Wrocław, bud. B-4, pok. 1.8/ 1.14',
        link: 'https://wm.pwr.edu.pl/studenci/dziekanat'
      },
      {
        id:11,
        name: 'Dziekanat Wydziału Podstawowych Problemów Techniki',
        location: 'ul. wybrzeże Wyspiańskiego 27, 50-370 Wrocław, bud. A-1, pok. 207',
        link: 'https://wppt.pwr.edu.pl/studenci/dziekanat'
      },
      {
        id:12,
        name: 'Dziekanat Wydziału Elektroniki, Fotoniki i Mikrosystemów',
        location: 'ul. Janiszewskiego 7-9, 50-372 Wrocław, bud. C-5, pok. 1',
        link: 'https://wefim.pwr.edu.pl/studenci/studia-1-i-2-stopnia/dziekanat'
      },
      {
        id:13,
        name: 'Dziekanat Wydziału Matematyki',
        location: 'ul. Hoene-Wrońskiego 13c, 50-376 Wrocław, bud. C-19, pok. A.2.19',
        link: 'https://wmat.pwr.edu.pl/studenci/dziekanat'
      },
      {
        id:14,
        name: 'Dziekanat Wydziału Medycznego',
        location: 'ul. Hoene-Wrońskiego 13c, 50-376 Wrocław, bud. C-20, pok. B.1.1',
        link: 'https://wmed.pwr.edu.pl/o-wydziale/struktura-organizacyjna/dziekanat'
      },

    ])
  }
}