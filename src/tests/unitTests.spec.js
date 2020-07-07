import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import CartInfo from '../components/CartInfo.vue'
import CartItem from '../components/CartItem.vue';

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Cart Info Component', () => {
  let actions
  let store
  let mutations

   beforeEach(() => {
    actions = {
      createOrder: jest.fn(),
    };
    mutations = {
      setOpenPopup: jest.fn(),
    };

    store = new Vuex.Store({
      state: {},
      getters: {
        getTotalPrice: jest.fn(() => 5500),
        isLoggedIn: jest.fn(() => true),
      },
      actions,
      mutations
    })
  })

  test('Component is a Vue Instance', () => {
    const wrapper = shallowMount(CartInfo,  { store, localVue })
    expect(wrapper.findComponent(CartInfo).vm).toBeTruthy()
  })

  test('Component Displays Value From Store', () => {
    const wrapper = shallowMount(CartInfo,  { store, localVue })

    const priceDiv = wrapper.find('#fullPrice');
    expect(priceDiv.text()).toBe('5500 ₽')
  })

  test('Component Create Order and Redirects to Order History', () => {
    const push = jest.fn();
    const $router = {
      push: jest.fn()
    }
    const $route = {
      name: "history"
    };
    const wrapper = shallowMount(CartInfo,  { store, localVue, mocks: { $router, $route } })
    const button = wrapper.find('#createOrder')

    button.trigger('click')

    expect(actions.createOrder).toHaveBeenCalled()

    expect(wrapper.vm.$route.name).toBe($route.name)
  })

  test('Component checks for being logged in', () => {
    const push = jest.fn();

    const $router = {
      push: jest.fn()
    }

    const $route = {
      name: "history"
    };

    store = new Vuex.Store({
      state: {},
      getters: {
        getTotalPrice: jest.fn(() => 5500),
        isLoggedIn: jest.fn(() => false),
      },
      actions,
      mutations
    })

    const wrapper = shallowMount(CartInfo,  { store, localVue, mocks: { $router, $route } })
    const button = wrapper.find('#createOrder')

    button.trigger('click')

    expect(actions.createOrder).toBeCalledTimes(0)

    expect(wrapper.vm.$route.name).toBe($route.name)
  })
})

describe('Cart Item Component', () => {
  let actions
  let store
  let mutations

   beforeEach(() => {
    mutations = {
      setCartItemCount: jest.fn(),
      removeCartItem: jest.fn()
    };

    store = new Vuex.Store({
      state: {},
      getters: {},
      actions,
      mutations
    })
  })

  test('Component is a Vue Instance', () => {
    const wrapper = shallowMount(CartItem,  { store, localVue })
    expect(wrapper.findComponent(CartItem).vm).toBeTruthy()
  })

  test('Component Can Remove Item from Cart', () => {
    const wrapper = mount(CartItem,  { 
      store, 
      localVue,
      propsData: {
        item: {
          name: 'hello',
          price: 190
        }
      }
     })
    const removeButton = wrapper.find('#removeButton');

    removeButton.trigger('click');

    expect(mutations.removeCartItem).toHaveBeenCalled()
  })

  test('Component Can Set Number of Chosen Items', () => {
    const wrapper = mount(CartItem,  { 
      store, 
      localVue,
      propsData: {
        item: {
          name: 'hello',
          price: 190
        }
      }
     })

    const inputNumber = wrapper.find('#itemCount')

    inputNumber.trigger('change')

    expect(mutations.setCartItemCount).toHaveBeenCalled()
  })

  test('Component Displays Prop Data Correctly', () => {
    const wrapper = mount(CartItem,  { 
      store, 
      localVue,
      propsData: {
        item: {
          name: 'hello',
          price: 190
        }
      }
})

const itemName = wrapper.find('#itemName')
const itemPrice = wrapper.find('#itemPrice')

expect(itemName.text()).toBe('hello')
expect(itemPrice.text()).toBe('190 ₽')
})
})