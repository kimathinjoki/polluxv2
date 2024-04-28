export const mockDataUsers = [
    {
      "user_id": 1,
      "username": "Tom",
      "email": "tom@example.com"
    },
    {
      "user_id": 2,
      "username": "Gray",
      "email": "gray@example.com"
    },
    {
      "user_id": 3,
      "username": "Mat",
      "email": "mat@example.com"
    },
    {
      "user_id": 4,
      "username": "Kim",
      "email": "kim@example.com"
    },
    {
      "user_id": 5,
      "username": "Rui",
      "email": "rui@example.com"
    },
    {
      "user_id": 6,
      "username": "Robin",
      "email": "robin@example.com"
    }
  ]

  export const mockDataParticipants = [
    {
      "participant_id": 1,
      "activity_id": 1,
      "user_id": 1
    },
    {
      "participant_id": 2,
      "activity_id": 1,
      "user_id": 2
    },
    {
      "participant_id": 3,
      "activity_id": 1,
      "user_id": 3
    },
    {
      "participant_id": 4,
      "activity_id": 2,
      "user_id": 4
    },
    {
      "participant_id": 5,
      "activity_id": 2,
      "user_id": 5
    },
    {
      "participant_id": 6,
      "activity_id": 2,
      "user_id": 6
    }
  ]


  export const mockDataActivities = [
    {
      "activity_id": 1,
      "name": "Caverns Trip",
      "date": "2024-04-20",
      "created_by": 1  // User ID of Tom (creator)
    },
    {
      "activity_id": 2,
      "name": "Naivasha Trip",
      "date": "2024-04-22",
      "created_by": 4  // User ID of Kim (creator)
    }
  ]


  export const mockDataContributions = [
    {
      "contribution_id": 1,
      "participant_id": 1,
      "activity_id": 1,
      "amount": 129,
      "date": "2024-04-20",
      "description": "Entrance Fee"
    },
    {
      "contribution_id": 2,
      "participant_id": 3,
      "activity_id": 1,
      "amount": 50,
      "date": "2024-04-20",
      "description": "Groceries"
    },
    {
      "contribution_id": 3,
      "participant_id": 4,
      "activity_id": 2,
      "amount": 400,
      "date": "2024-04-22",
      "description": "Food"
    },
    {
      "contribution_id": 4,
      "participant_id": 5,
      "activity_id": 2,
      "amount": 200,
      "date": "2024-04-22",
      "description": "Gas"
    }
  ]


  export const mockDataExpenses = [
    {
      "expense_id": 1,
      "activity_id": 1,
      "description": "Groceries",
      "amount": 50,
      "paid_by": 3  // User ID of Mat (paid for groceries)
    },
    {
      "expense_id": 2,
      "activity_id": 1,
      "description": "Entrance Fee",
      "amount": 129,
      "paid_by": 1  // User ID of Tom (paid for entrance fee)
    },
    {
      "expense_id": 3,
      "activity_id": 2,
      "description": "Food",
      "amount": 400,
      "paid_by": 4  // User ID of Kim (paid for food)
    },
    {
      "expense_id": 4,
      "activity_id": 2,
      "description": "Gas",
      "amount": 200,
      "paid_by": 5  // User ID of Rui (paid for gas)
    }
  ]