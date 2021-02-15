import { CrossAxisAlignment, EdgeInsetsStep } from '@/abstract'
import {
  ElevatedButton,
  MultiProvider,
  Row,
  SizedBox,
  Text,
} from '@/components'
import { computed, defineComponent, h, ref } from 'vue'
import { HeroesModel } from './HeroesModel'

export const HeroButton = () => {
  return defineComponent({
    name: 'HeroButton',
    setup() {
      const heroModel = MultiProvider.get<HeroesModel>(HeroesModel)
      const heroCount = computed(() => heroModel.count)
      return () =>
        h(
          Row({
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              ElevatedButton({
                child: Text({
                  text: ref('Add hero'),
                }),
                onTap: () => {
                  heroModel.add({ name: 'New Hero' })
                },
              }),
              SizedBox({ width: EdgeInsetsStep.s10 }),
              Text({
                text: heroCount,
              }),
            ],
          })
        )
    },
  })
}
