import { User } from './user.model';

let initialMiddleNumber = Math.floor(Math.random() * 100);
let initialMonth = new Date().getMonth() + 1;

export const findLastUserID = async () => {
  const lastUserID = await User.findOne({}, { id: 1, _id: 0 }).sort({ id: -1 });
  return lastUserID?.id;
};

export async function generateUserID(): Promise<string> {
  const lastID = await findLastUserID();
  let nextID;

  if (lastID) {
    // Extract the numeric part of the last ID
    const lastNumericID = parseInt(lastID.split('-')[2]);

    // Increment the numeric ID
    const nextNumericID = lastNumericID + 1;

    // Create the next ID with padded zeros
    nextID = nextNumericID.toString().padStart(4, '0');
  } else {
    // No ID found in the database, set initial ID as "0001"
    nextID = '0001';
  }

  const yearCode = new Date().getFullYear() % 100; // Extract the last two digits of the year
  const currentMonth = new Date().getMonth() + 1;

  let middle;

  if (currentMonth - initialMonth >= 6) {
    initialMiddleNumber += 1;
    initialMonth = currentMonth;
    middle = initialMiddleNumber.toString().padStart(2, '0');
  } else {
    middle = initialMiddleNumber.toString().padStart(2, '0');
  }

  const userID = `${yearCode}${currentMonth >= 6 ? 2 : 1}-${middle}-${nextID}`;
  return userID;
}
