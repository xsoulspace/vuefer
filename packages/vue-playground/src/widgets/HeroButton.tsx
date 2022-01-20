import { MultiProvider } from '@xsoulspace/vue-provider'
import { computed, defineComponent, h, ref } from 'vue'
import {
  CrossAxisAlignment,
  EdgeInsetsStep,
  ElevatedButton,
  Row,
  SizedBox,
  Text,
} from '../../../vuefer/lib'
import { HeroesProvider } from '../providers/HeroesProvider'

export const HeroButton = () => {
  return defineComponent({
    name: 'HeroButton',
    setup() {
      const heroModel = MultiProvider.get<HeroesProvider>(HeroesProvider)
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
