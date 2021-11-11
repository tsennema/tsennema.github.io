const restaurantList = [
    { name: 'The Works', style: 'American', price: '$$', },
    { name: 'Kentucky Bourbon', style: 'American', price: '$$', },
    { name: 'Lancaster Smokehouse', style: 'American', price: '$$', },
    { name: 'Grand Trunk Saloon', style: 'American', price: '$$', },
    { name: 'Copper Branch', style: 'American', price: '$$', },
    { name: 'Cafe Pyrus', style: 'American', price: '$', },
    { name: 'Gols', style: 'Asian', price: '$', },
    { name: 'Poke Box', style: 'Asian', price: '$', },
    { name: 'Taste of Seoul', style: 'Asian', price: '$$', },
    { name: 'Bao Sandwich Bar', style: 'Asian', price: '$', },
    { name: 'Ben Tanh', style: 'Asian', price: '$$', },
    { name: 'Thai Bistro', style: 'Asian', price: '$$', },
    { name: 'Red Ginger', style: 'Asian', price: '$$', },
    { name: 'Sansotei Ramen', style: 'Asian', price: '$', },
    { name: 'iShawarma', style: 'MiddleEast', price: '$', },
    { name: 'Arabesque', style: 'MiddleEast', price: '$$', },
    { name: 'Mediterraneo', style: 'European', price: '$$', },
    { name: 'Famoso', style: 'European', price: '$$', },
    { name: 'Burrito Boyz', style: 'Mexican', price: '$', },
    { name: 'Taco Farm', style: 'Mexican', price: '$$', },
    { name: 'Bar Burrito', style: 'Mexican', price: '$', },
    { name: 'Angels Diner', style: 'Breakfast', price: '$$', },
    { name: 'Jacks', style: 'Breakfast', price: '$$', },
    { name: 'Mels', style: 'Breakfast', price: '$', },
    { name: 'Coras', style: 'Breakfast', price: '$$', },
    { name: 'Korner Kitchen', style: 'Breakfast', price: '$$', },
    { name: 'Kypreos', style: 'Breakfast', price: '$$', }
]

const movieList = [
    { name: 'Kingsman', genre: 'Action' },
    { name: 'Italian Job', genre: 'Action' },
    { name: 'Hot Fuzz', genre: 'Action/Comedy' },
    { name: 'No Strings Attached', genre: 'RomCom' },
    { name: 'Friends With Benefits', genre: 'RomCom' },
    { name: '27 Dresses', genre: 'RomCom' },
    { name: 'The Iron Giant', genre: 'Family' },
    { name: 'Ice Age', genre: 'Family' },
    { name: 'Fight Club', genre: 'Drama' },
    { name: 'Weekend at Bernies', genre: 'Comedy' },
]

const wheels = {
    //Try this format
    // examples: [exampleList, heading1, heading2, heading3]
    // where heading1 is always a name/identifier
    restaurants: [restaurantList, "name", "style", "price"],
    movies: [movieList, "name", "genre"]
}