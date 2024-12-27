const emailResponse = await fetch("http://localhost:1234/api/v1/email-verification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: "anonyyme64@gmail.com" }), // Send the email
        });
