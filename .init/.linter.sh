#!/bin/bash
cd /home/kavia/workspace/code-generation/calorie-tracker-and-nutrition-monitor-151300-151310/calorie_tracker_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

