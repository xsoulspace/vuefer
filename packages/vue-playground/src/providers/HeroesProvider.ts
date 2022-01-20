import { reactive } from 'vue'
import { Maybe } from '../../../vuefer/lib'
export class HeroModel {
  constructor(public name: string) {}
}

export class HeroesProvider {
  heroes = reactive<Maybe<HeroModel>[]>([])
  add(hero: HeroModel): void {
    this.heroes.push(hero)
  }
  get count(): number {
    return this.heroes.length
  }
}
