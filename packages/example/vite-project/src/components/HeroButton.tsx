import { HeroesModel } from '#/models/HeroesModel'
import {
  CrossAxisAlignment,
  EdgeInsetsStep,
  ElevatedButton,
  MultiProvider,
  Row,
  SizedBox,
  Text,
} from '@xsoulspace/vuefer'
import { computed, defineComponent, h, ref } from 'vue'

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
