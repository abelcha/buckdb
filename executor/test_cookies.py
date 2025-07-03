#!/usr/bin/env python3
"""
Test script for BuckDB executor cookie-based session management.
This script demonstrates how the server handles session cookies.
"""

import requests
import json

def test_cookie_session_management():
    """Test the cookie-based session management functionality."""
    base_url = "http://127.0.0.1:8080"
    
    print("Testing BuckDB Executor Cookie Session Management")
    print("=" * 50)
    
    # Test 1: First request without cookies (should create new session)
    print("\n1. Testing first request (no cookies - should create new session)")
    payload = {
        "query": "SELECT 1 as test_value;"
    }
    
    try:
        response = requests.post(base_url, json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        # Check if Set-Cookie header is present
        if 'Set-Cookie' in response.headers:
            print(f"Set-Cookie header: {response.headers['Set-Cookie']}")
            session_cookie = response.headers['Set-Cookie']
        else:
            print("No Set-Cookie header found")
            return
            
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to server. Make sure the server is running on port 8080.")
        return
    except Exception as e:
        print(f"Error: {e}")
        return
    
    # Test 2: Second request with the session cookie (should reuse session)
    print("\n2. Testing second request with session cookie (should reuse session)")
    
    # Extract session_id from Set-Cookie header
    session_id = None
    if 'session_id=' in session_cookie:
        session_id = session_cookie.split('session_id=')[1].split(';')[0]
        print(f"Extracted session_id: {session_id}")
    
    if session_id:
        headers = {
            'Cookie': f'session_id={session_id}'
        }
        
        payload2 = {
            "query": "CREATE TABLE test_table (id INTEGER, name TEXT); INSERT INTO test_table VALUES (1, 'Alice'), (2, 'Bob');"
        }
        
        try:
            response2 = requests.post(base_url, json=payload2, headers=headers)
            print(f"Status Code: {response2.status_code}")
            print(f"Response: {response2.text}")
            
            # This should NOT have a Set-Cookie header since we're reusing the session
            if 'Set-Cookie' in response2.headers:
                print(f"Unexpected Set-Cookie header: {response2.headers['Set-Cookie']}")
            else:
                print("Good: No Set-Cookie header (reusing existing session)")
                
        except Exception as e:
            print(f"Error: {e}")
            return
    
    # Test 3: Third request with same cookie to verify data persistence
    print("\n3. Testing data persistence in the same session")
    
    if session_id:
        payload3 = {
            "query": "SELECT * FROM test_table;"
        }
        
        try:
            response3 = requests.post(base_url, json=payload3, headers=headers)
            print(f"Status Code: {response3.status_code}")
            print(f"Response: {response3.text}")
            
        except Exception as e:
            print(f"Error: {e}")
            return
    
    # Test 4: Request without cookie (should create a new session)
    print("\n4. Testing request without cookie (should create new session)")
    
    payload4 = {
        "query": "SELECT * FROM test_table;"
    }
    
    try:
        response4 = requests.post(base_url, json=payload4)
        print(f"Status Code: {response4.status_code}")
        print(f"Response: {response4.text}")
        
        # Should have Set-Cookie header for new session
        if 'Set-Cookie' in response4.headers:
            print(f"Set-Cookie header: {response4.headers['Set-Cookie']}")
            new_session_id = response4.headers['Set-Cookie'].split('session_id=')[1].split(';')[0]
            print(f"New session_id: {new_session_id}")
            
            if new_session_id != session_id:
                print("Good: New session created with different ID")
            else:
                print("Warning: Same session ID returned")
        else:
            print("Error: No Set-Cookie header found for new session")
            
    except Exception as e:
        print(f"Error: {e}")
        return
    
    print("\n" + "=" * 50)
    print("Cookie session management test completed!")

if __name__ == "__main__":
    test_cookie_session_management()