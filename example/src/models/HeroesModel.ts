import { reactive } from 'vue'
import { Maybe } from '../../../lib'
export class Hero {
  constructor(public name: string) {}
}

export class HeroesModel {
  heroes = reactive<Maybe<Hero>[]>([])
  add(hero: Hero) {
    this.heroes.push(hero)
  }
  get count() {
    return this.heroes.length
  }
}
