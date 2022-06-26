export interface Reminder {
  reminderId: string,
  name: string,
  description: string,
  dueDate: string,
  startNotifyingDate: string,
  pingFrequencyInterval: number
}
