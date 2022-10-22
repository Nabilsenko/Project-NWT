db.getCollection('cpu').insertOne(
    {
      name : 'i7',
      brand: 'Intel',
      architecture: ["test1", "test2"],
      image: 'https://randomuser.me/portraits/men/1.jpg',
      core : {
        physical: 15,
        thread : 10
      },
      frequency : {
        base: 2.5,
        turbo: 3.4
      },
      cache: [10,15]
    }
);