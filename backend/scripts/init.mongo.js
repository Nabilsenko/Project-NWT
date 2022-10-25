db.getCollection('cpus').insertMany(
[
    {
      name : 'i5 12600K',
      brand: 'Intel',
      architecture: ["x86"],
      image: 'https://randomuser.me/api/portraits/lego/6.jpg',
      core : {
        physical: 10,
        thread : 16
      },
      frequency : {
        base: 3.7,
        turbo: 4.2
      },
      cache: [10,15]
    },
    {
      name : 'i7 12700K',
      brand: 'Intel',
      architecture: ["x86"],
      image: 'https://randomuser.me/api/portraits/lego/6.jpg',
      core : {
        physical: 12,
        thread : 20
      },
      frequency : {
        base: 3.6,
        turbo: 4.5
      },
      cache: [12,17]
    },
    {
      name : 'Ryzen 5 5600X',
      brand: 'AMD',
      architecture: ["x86"],
      image: 'https://randomuser.me/api/portraits/lego/6.jpg',
      core : {
        physical: 6,
        thread : 12
      },
      frequency : {
        base: 3.7,
        turbo: 3.9
      },
      cache: [12,15]
    },
    
    {
      name : 'Ryzen 9 7950X',
      brand: 'AMD',
      architecture: ["x86"],
      image: 'https://randomuser.me/api/portraits/lego/6.jpg',
      core : {
        physical: 16,
        thread : 32
      },
      frequency : {
        base: 4.5,
        turbo: 5.2
      },
      cache: [16,20]
    },
  ]);