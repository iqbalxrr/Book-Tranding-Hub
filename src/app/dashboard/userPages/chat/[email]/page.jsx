
"use client";

import FirestoreChat from "@/components/Live Chat/FirestoreChat";
import { useParams } from "next/navigation";


export default function ChatPage() {
  const {email} = useParams();

 
  return (
     <div className="p-4">
      <FirestoreChat recipientEmail={decodeURIComponent(email)} />
    </div>
  );
}
