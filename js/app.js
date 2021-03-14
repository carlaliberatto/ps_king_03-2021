const url = "http://gateway.marvel.com/v1/public/characters", //URL dada na API
    key = "dcd33fa40d2ea592939997cb953b9fed", //apiKey pública
    hash = "f348bff1df5f4c7756c031c4a1a9e16c", //hash criado com ts + apiKey priv + apiKey pública
    heroesId = ['1010743', '1009220'] //Id dos heróis encontrados na API

function loadHeroes() {
    const container = $('.container'); //div criada no HTML

    $.each(heroesId, (i, heroId) => { //preferi utilizar jQuery para formar a construção com loop menos sujeita a erros

        getCharacter(url, heroId).done((characters) => { //função criada na linha 37
            const heroes = characters.data.results
            let heroStories = []

            $.each(heroes, (index, hero) => {
                let stories = characters.data.results[index].stories.items.slice(0, 2)
                $.each(stories, (k, story) => { heroStories.push(story.name) }) //puxa as histórias dos heróis
                const heroContainer = $(document.createElement('div'))
                heroContainer.addClass("hero-container")
                const h1 = $(document.createElement('h1')).text(hero.name)
                heroContainer.append(h1)
                const imageContainer = $(document.createElement('div'))
                imageContainer.addClass("image-container")
                const img = document.createElement("img")
                img.setAttribute("src", hero.thumbnail.path + ".jpg")
                imageContainer.append(img)
                heroContainer.append(imageContainer)
                const texto = `Duas das histórias do personagem são ${heroStories[0]} e ${heroStories[1]}.` //pega as duas primeiras histórias que constam na API
                const p = $(document.createElement('p')).text(texto)
                heroContainer.append(p)
                container.append(heroContainer)
            })
        })
    })
}

function getCharacter(url, id) { //função utilizando ajax para retornar a URL com o herói
    return $.ajax({
        url: `${url}/${id}?ts=1&apikey=${key}&hash=${hash}`,
        withCredentials: true,
        crossDomain: true
    })
}

loadHeroes()