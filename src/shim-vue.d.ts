// fix TS error where vue files are not recognized in IntelliJ
declare module '*.vue' {
    import { defineComponent } from 'vue'
    const component: ReturnType<typeof defineComponent>
    export default component
}