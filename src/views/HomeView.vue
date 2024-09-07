<script lang="ts">
import { postLog } from '@/utils/OpenSearch';

export default {
  data() {
    return {
      baseUrl: 'https://pokeapi.co/api/v2/pokemon/',
      pokeName: '',
      pokemon: null as any,
      showError: false,
      showPokemon: false,
    };
  },
  methods: {
    async requestPokeInfo(url: string, name: string) {
      postLog({
        type: 'search',
        message: `Searching for ${name}`,
        value: url,
        value2: name
      });
      
      await fetch(url + name)
        .then(response => response.json())
        .then(data => {
          this.pokemon = data;
        })
        .catch(err => console.log(err));
    },
    async getPokemon() {
      const name = this.pokeName.toLowerCase();
      this.pokeName = '';
      await this.requestPokeInfo(this.baseUrl, name)
        .then(() => {
          if (this.pokemon.detail) {
            this.showError = true;
            this.showPokemon = false;
          }else{
            this.showError = false;
            this.showPokemon = true;
          }
        });
    },
  },
};
</script>

<template>
  <main class="container">
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" alt="Pokemon Logo">

    <div class="search">
      <input type="search" class="search-input" v-model="pokeName" placeholder="Digite o nome do pokemon">
      <button class="search-button" @click="getPokemon">Procurar</button>
    </div>

    <section class="pokemon" v-if="showPokemon">
      <div class="pokemon-picture">
        <img :src="pokemon.sprites.front_default" alt="Sprite of ${pokemon.name}">
      </div>
      <div class="pokemon-info">
          <h1 class="name">{{pokemon.name}}</h1>
          <span class="number">Nº {{pokemon.id}} - Type: {{pokemon.types.map((item: any) => item.type.name).toString()}}</span>
          <h3 class="skill">Skills: {{pokemon.moves.map((item: any) => ' ' + item.move.name).toString()}}</h3>
          <h3 class="weight">Weight: {{pokemon.weight  / 10}}kg</h3>
          <h3 class="height">Height: {{pokemon.height  / 10}}m</h3>
      </div>
    </section>
    <span class="error" v-show="showError">Pokemon não encontrado.</span>
  </main>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em 0;
}

.search {
  width: 90%;
  display: flex;
  justify-content: center;
  padding: 1em 0;
}


.search .search-input,
.search .search-button {
  border: 0;
  padding: 1em;
}

.search .search-input {
  width: 100%;
}

.search .search-button {
  background-color: #2b75bb;
  color: #fff;
  cursor: pointer;
}


.error {
  display: none;
  font-size: 1.5em;
}

.pokemon {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /*background-color: #f2f2f2;*/
  background-color: #fff;
  opacity: 1;
  color: white; 
}

.pokemon .pokemon-picture {
  width: 150px;
  display: flex;
  align-items: center;
  padding: 15px;
  border: 2px solid #FFC312;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 38px;
  margin-bottom: 38px;
}

.pokemon .pokemon-picture img {
  width: 100%;
}


.pokemon .pokemon-info {
  width: 100%;
  background-color: #163f5e;
  flex: 2;
}

.pokemon-info {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 1em;
}


.pokemon-info .name,
.pokemon-info .skill,
.pokemon-info .weight,
.pokemon-info .height  {
  width: 100%;
  padding: .5em .2em;
  font-size: 1.7em;
}

.pokemon-info .name {
  font-size: 2.5em;
  text-align: center;
  color: #FFC312; 
  font-weight: bold;
  text-transform: capitalize;
}
.pokemon-info .number{
  width: 100%;
  text-align: center;
  font-size: 1em;
  font-weight: bold;
  margin: 0;
  text-transform: capitalize;
}
.pokemon-info .skill{
  text-align: justify;
  font-size: 1em;
  margin-top: 20px;
  margin-bottom: 20px;
}
.pokemon-info .weight,
.pokemon-info .height {
  width: 100%;
  text-align: center;
  font-size: 1em;
  font-weight: bold;
}

.fade {
  animation: fadeEfect 4s;
}



@media(min-width: 758px) {
  .pokemon { 
    flex-direction: row;  
  }
}

@keyframes fadeEfect{
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

</style>