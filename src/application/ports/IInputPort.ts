export interface IInputPort<I, O = void> {
  execute(data: I): Promise<O>
}