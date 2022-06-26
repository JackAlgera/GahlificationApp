import React, { useEffect, useState } from 'react';
import { Text, View } from "react-native";
import { Reminder } from "../../_models/applicationModels";
import backendApiService from "../../_services/BackendAPIService";

interface RemindersPageProps {
}

const ListCats = (props: RemindersPageProps) => {

  const [ reminderList, setReminderList ] = useState<Reminder[]>([]);

  useEffect(() => {
    return () => {
      backendApiService.getAllReminders(handleResponse, () => {});
    };
  }, []);

  const handleResponse = (reminderList: Reminder[]) => {
    setReminderList(reminderList);
  }
  
  return (
    <View style={{ alignContent: "center" }}>
      <Text>
        <Text>This is some text</Text>
      </Text>
      { reminderList.map((reminder: Reminder) => (
      <Text>{reminder.name}</Text>
      )) }
    </View>
  );
}

export default ListCats;
