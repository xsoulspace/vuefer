import { reactive } from 'vue'
import { Maybe } from '../../../vuefer/lib'
export class Hero {
  constructor(public name: string) {}
}

export class HeroesModel {
  heroes = reactive<Maybe<Hero>[]>([])
  add(hero: Hero): void {
    this.heroes.push(hero)
  }
  get count(): number {
    return this.heroes.length
  }
}
