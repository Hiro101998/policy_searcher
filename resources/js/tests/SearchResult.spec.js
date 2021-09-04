require('jsdom-global')
import { mount } from '@vue/test-utils'
import Greeting from './Greeting.vue'

describe('Greeting.vue', () => {
  it('renders a greeting', () => {
    const wrapper = mount(Greeting)
    console.log(wrapper.html())
  })
})