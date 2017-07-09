<script>
  export default {
    props: {
      active: {
        type: [Array, String, Number],
        default: [-1]
      },
      accordion: {
        type: Boolean,
        default: false
      },
      onChange: Function
    },
    data () {
      return {
        activeVal: [].concat(this.active)
      }
    },
    computed: {

    },
    render(createElement) {
      let children = [].concat(this.$slots.default);
      let accordionIndex = 0;
      children.map((vnode) => {
        let componentOptions = vnode.componentOptions;
        if (componentOptions && componentOptions.tag === "AccordionItem") {
          const expanded = this.activeVal.indexOf(accordionIndex) !== -1;
          componentOptions.propsData.index = accordionIndex;
          componentOptions.propsData.expanded = expanded;
          if (!componentOptions.listeners) {
            componentOptions.listeners = {};
          }
          componentOptions.listeners.onClick = this.handleClick;
          accordionIndex ++;
        }
      });
      return createElement('div', {
        'class': 'accordion-list'
      }, children);
    },
    methods: {
      handleClick: function (index) {
        let newState = {};
        newState.active = this.activeVal;
        const position = newState.active.indexOf(index);
        if (position !== -1) {
          newState.active.splice(position, 1);
        } else if (this.accordion) {
          newState.active = [index];
        } else {
          newState.active.push(index);

        }
        if (this.onChange) {
          this.onChange(newState.active);
        }
        this.activeVal = newState.active;
      },
      deepClone(vnodes, createElement) {
        function cloneVNode (vnode) {
          const clonedChildren = vnode.children && vnode.children.map(vnode => cloneVNode(vnode));
          const cloned = createElement(vnode.tag, vnode.data, clonedChildren);
          cloned.text = vnode.text;
          cloned.isComment = vnode.isComment;
          cloned.componentOptions = vnode.componentOptions;
          cloned.elm = vnode.elm;
          cloned.context = vnode.context;
          cloned.ns = vnode.ns;
          cloned.isStatic = vnode.isStatic;
          cloned.key = vnode.key;
          return cloned;
        }
        const clonedVNodes = vnodes.map(vnode => cloneVNode(vnode))
        return clonedVNodes;
      }
    },
    mounted () {
    }
  }
</script>

<style lang="less">
  @import "../../styles/_colors-vars.less";
  @import "../../styles/_mixins.less";

  .body {
    font-size: 12px;
  }
</style>
