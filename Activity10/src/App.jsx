import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState(1);
  const [matches, setMatches] = useState([]);
  
useEffect(() => {
    fetchMatches();

    const channel = supabase
        .channel("matches-changes")
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "matches"
            },
            () => {
                fetchMatches();
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
}, []);

async function fetchMatches() {
    const { data, error } = await supabase
        .from("matches")
        .select("*");

    if (error) {
        console.error("Error fetching matches:", error.message, error);
    } else {
        setMatches(data);
    }
}

async function handleBooking(matchId) {
    const customerName = prompt("Enter your name:");
    const tickets = Number(prompt("Enter number of tickets:"));

    if (!customerName || !tickets || tickets <= 0) {
        alert("Please enter valid booking details.");
        return;
    }

    const match = matches.find((item) => item.id === matchId);

    if (!match || tickets > match.available_seats) {
        alert("Not enough seats available!");
        return;
    }

    const { error: bookingError } = await supabase
        .from("bookings")
        .insert([
            {
                customer_name: customerName,
                match_id: matchId,
                tickets: tickets
            }
        ]);

    if (bookingError) {
        alert(bookingError.message);
        return;
    }

    const { error: updateError } = await supabase
        .from("matches")
        .update({
            available_seats: match.available_seats - tickets
        })
        .eq("id", matchId);

    if (updateError) {
        alert(updateError.message);
        return;
    }

    alert("Booking successful!");
    fetchMatches();
}

    

    return (
        <div>
            <Navbar />
            <Hero />
            <div>
    <h2>Book Your Tickets</h2>

    <p>Ticket Quantity: {tickets}</p>

    <button onClick={() => setTickets(tickets + 1)}>
        Add Ticket
    </button>

    <button onClick={() => setTickets(Math.max(1, tickets - 1))}>
        Remove Ticket
    </button>
</div>

            <h2>Upcoming IPL Matches</h2>

            <div className="matches">
                {matches.map((match, index) => (
                    <MatchCard
                        key={index}
                        team1={match.team1}
                        team2={match.team2}
                        date={match.match_date}
                        venue={match.venue}
                        id={match.id}
availableSeats={match.available_seats}
onBook={handleBooking}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
